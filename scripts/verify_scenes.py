"""Check the starter scenes and the face-count math the lessons rely on.

    blender --background --python scripts/verify_scenes.py -- starter/blender/5.2/intro [render_dir]
    python scripts/verify_scenes.py starter/blender/5.2/intro [render_dir]

Prints PASS/FAIL lines. With render_dir, also renders proof images (Workbench).
"""
import bpy
import bmesh
import math
import os
import sys

args = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else sys.argv[1:]
folder = os.path.abspath(args[0] if args else "starter/blender/5.2/intro")
render_dir = os.path.abspath(args[1]) if len(args) > 1 else None
fails = 0


def check(name, ok, detail=""):
    global fails
    fails += 0 if ok else 1
    print(("PASS " if ok else "FAIL ") + name + (" (" + detail + ")" if detail else ""))


def load(name):
    bpy.ops.wm.open_mainfile(filepath=os.path.join(folder, name))


def render(name, location, rotation, ortho=None):
    if not render_dir:
        return
    scene = bpy.context.scene
    cam_data = bpy.data.cameras.new("ProofCam")
    if ortho:
        cam_data.type = "ORTHO"
        cam_data.ortho_scale = ortho
    cam = bpy.data.objects.new("ProofCam", cam_data)
    scene.collection.objects.link(cam)
    cam.location = location
    cam.rotation_euler = [math.radians(a) for a in rotation]
    scene.camera = cam
    scene.render.engine = "BLENDER_WORKBENCH"
    scene.display.shading.color_type = "MATERIAL"
    scene.render.resolution_x = scene.render.resolution_y = 480
    scene.render.filepath = os.path.join(render_dir, name)
    bpy.ops.render.render(write_still=True)


def counts(me):
    return len(me.vertices), len(me.polygons)


# Lesson 1: top orthographic shows the letter, perspective scrambles it.
load("lesson-1-find-your-bearings.blend")
stones = [o for o in bpy.data.objects if o.name.startswith("Stone")]
check("L1 has letter stones", len(stones) >= 15, str(len(stones)))
heights = sorted(o.matrix_world.translation.z for o in stones)
check("L1 stones at mixed heights", heights[-1] - heights[0] > 3, "%.1f range" % (heights[-1] - heights[0]))
render("l1-top-ortho.png", (1, -0.5, 30), (0, 0, 0), ortho=9)
render("l1-perspective.png", (8, -12, 9), (60, 0, 35))

# Lesson 2: Ctrl I from the barrel, minus ground and lighthouse, leaves only crates.
load("lesson-2-clear-the-wreckage.blend")
selectable = [o for o in bpy.data.objects if not o.hide_select]
picked = {o.name for o in selectable} - {"Oil Barrel", "Ground", "Lighthouse"}
check("L2 Ctrl I route selects only crates", all(n.startswith("Crate") for n in picked), ", ".join(sorted(picked)))
for o in list(bpy.data.objects):
    if o.name in picked:
        bpy.data.objects.remove(o)
render("l2-after-delete.png", (1.5, -1.0, 14), (0, 0, 0), ortho=7)

# Lesson 3: R X 90 stands the pole up, letter faces Front view.
load("lesson-3-raise-the-flagpole.blend")
pole = bpy.data.objects["Flagpole"]
pole.rotation_euler.x = math.radians(90)
bpy.context.view_layer.update()
top = max((pole.matrix_world @ v.co).z for v in pole.data.vertices)
check("L3 R X 90 stands the pole up", top > 2.5, "top z %.2f" % top)
paint = bpy.data.objects["Flag Paint"]
normal = (paint.matrix_world.to_3x3() @ paint.data.polygons[0].normal).normalized()
check("L3 letter faces the Front view", normal.y < -0.9, "normal %s" % (tuple(round(n, 2) for n in normal),))
pole.scale = (1.5, 1.5, 1.5)
render("l3-front.png", (1, -14, 2.5), (90, 0, 0), ortho=8)

# Lesson 4: loose vertices exist inside the boulder.
load("lesson-4-inside-the-boulder.blend")
me = bpy.data.objects["Boulder"].data
used = {v for e in me.edges for v in e.vertices}
loose = [v for v in me.vertices if v.index not in used]
check("L4 loose vertices hidden inside", len(loose) > 50 and all(v.co.length < 1.6 for v in loose), str(len(loose)))


def face_count_after(steps, start_scene):
    """Replay the lesson's Edit Mode steps with bmesh and return (verts, faces)."""
    load(start_scene)
    obj = bpy.data.objects["Cube"] if "Cube" in bpy.data.objects else bpy.data.objects["Lantern Box"]
    bm = bmesh.new()
    bm.from_mesh(obj.data)
    for step in steps:
        # The selected face: highest, then closest to the middle (the inset's inner face).
        top = max(bm.faces, key=lambda f: (round(f.calc_center_median().z, 4), -f.calc_center_median().xy.length))
        if step[0] == "extrude":
            res = bmesh.ops.extrude_face_region(bm, geom=[top])
            verts = [g for g in res["geom"] if isinstance(g, bmesh.types.BMVert)]
            bmesh.ops.translate(bm, verts=verts, vec=(0, 0, step[1]))
            bmesh.ops.delete(bm, geom=[top], context="FACES_ONLY")  # Blender's E does the same
        elif step[0] == "inset":
            bmesh.ops.inset_region(bm, faces=[top], thickness=step[1])
        elif step[0] == "loopcut":
            z_mid = step[1]
            ring = [e for e in bm.edges if abs(e.verts[0].co.z - e.verts[1].co.z) > 0.5
                    and min(v.co.z for v in e.verts) < z_mid < max(v.co.z for v in e.verts)
                    and all(abs(v.co.x) > 0.99 and abs(v.co.y) > 0.99 for v in e.verts)]
            bmesh.ops.subdivide_edges(bm, edges=ring, cuts=1, use_grid_fill=False)
    bm.faces.ensure_lookup_table()
    return len(bm.verts), len(bm.faces)


# Lesson 5: inset 0.2 then extrude -0.8 gives 14 faces; one loop cut gives 18.
v, f = face_count_after([("inset", 0.2), ("extrude", -0.8)], "lesson-5-hollow-the-lantern.blend")
check("L5 inset + extrude = 14 faces", f == 14, "%d verts, %d faces" % (v, f))
v, f = face_count_after([("inset", 0.2), ("extrude", -0.8), ("loopcut", 0.0)], "lesson-5-hollow-the-lantern.blend")
check("L5 plus loop cut = 18 faces", f == 18, "%d verts, %d faces" % (v, f))

# Lesson 6: extrude 1.5, inset 0.2, extrude -0.3, loop cut = 24 verts, 22 faces.
v, f = face_count_after([("extrude", 1.5), ("inset", 0.2), ("extrude", -0.3), ("loopcut", 1.25)], "lesson-6-build-the-beacon.blend")
check("L6 full build = 24 verts / 22 faces", (v, f) == (24, 22), "%d verts, %d faces" % (v, f))
v, f = face_count_after([("extrude", 1.5), ("inset", 0.2), ("extrude", -0.3)], "lesson-6-build-the-beacon.blend")
check("L6 missing loop cut = 18 faces", f == 18, "%d faces" % f)
v, f = face_count_after([("extrude", 1.5), ("inset", 0.2)], "lesson-6-build-the-beacon.blend")
check("L6 missing two steps = 14 faces", f == 14, "%d faces" % f)

print("Blender", bpy.app.version_string, "-", "ALL PASS" if not fails else "%d FAILED" % fails)
sys.exit(1 if fails else 0)
