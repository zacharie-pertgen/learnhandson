"""Build the Signal Island starter scenes for the companion route.

Run inside Blender (any machine with Blender 5.2 LTS installed):

    blender --background --python scripts/build_scenes.py -- starter/blender/5.2/intro

or with the `bpy` module from PyPI (pip install bpy==5.2.4):

    python scripts/build_scenes.py starter/blender/5.2/intro

For a new Blender version, run this script with that version and save into a
new folder (for example starter/blender/6.2/intro). Never re-save files by hand.

Puzzle rules (keep these true when editing):
- Object names never spoil a flag letter.
- The Sea and every flag object are unselectable, so Ctrl I in Lesson 2 never
  grabs them, and nobody deletes a flag by accident.
"""

import math
import os
import random
import sys

import bpy  # must come first when using the bpy module from PyPI
import bmesh
import mathutils

# ---------------------------------------------------------------- letters --
# 5 x 7 bitmaps. Row 0 is the top row.
LETTERS = {
    "B": ["####.", "#...#", "#...#", "####.", "#...#", "#...#", "####."],
    "C": [".####", "#....", "#....", "#....", "#....", "#....", ".####"],
}

COLORS = {
    "sand": (0.86, 0.76, 0.55, 1),
    "grass": (0.42, 0.62, 0.36, 1),
    "sea": (0.16, 0.36, 0.52, 1),
    "stone": (0.55, 0.55, 0.58, 1),
    "white": (0.92, 0.92, 0.9, 1),
    "red": (0.72, 0.2, 0.18, 1),
    "wood": (0.5, 0.33, 0.18, 1),
    "crate": (0.62, 0.45, 0.26, 1),
    "oil": (0.24, 0.3, 0.36, 1),
    "cloth": (0.95, 0.88, 0.7, 1),
    "ink": (0.12, 0.12, 0.16, 1),
    "gold": (1.0, 0.72, 0.2, 1),
    "lantern": (0.3, 0.32, 0.36, 1),
}


def out_dir():
    args = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else sys.argv[1:]
    path = args[0] if args else "starter/blender/5.2/intro"
    os.makedirs(path, exist_ok=True)
    return os.path.abspath(path)


def material(name):
    mat = bpy.data.materials.get(name)
    if mat is None:
        mat = bpy.data.materials.new(name)
        color = COLORS[name]
        mat.diffuse_color = color  # Solid view "Material" color
        if mat.node_tree is None:
            mat.use_nodes = True
        bsdf = mat.node_tree.nodes.get("Principled BSDF")
        if bsdf:
            bsdf.inputs["Base Color"].default_value = color
            bsdf.inputs["Roughness"].default_value = 0.8
    return mat


def mesh_object(name, bm, mat=None, location=(0, 0, 0)):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    obj = bpy.data.objects.new(name, me)
    obj.location = location
    if mat:
        me.materials.append(material(mat))
    bpy.context.scene.collection.objects.link(obj)
    return obj


def cylinder(name, radius, depth, mat, location, segments=16):
    bm = bmesh.new()
    bmesh.ops.create_cone(
        bm, cap_ends=True, segments=segments, radius1=radius, radius2=radius, depth=depth
    )
    return mesh_object(name, bm, mat, location)


def cone(name, r1, r2, depth, mat, location, segments=16):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=segments, radius1=r1, radius2=r2, depth=depth)
    return mesh_object(name, bm, mat, location)


def cube(name, size, mat, location):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=size)
    return mesh_object(name, bm, mat, location)


def text_mesh(name, letter, size, mat, location):
    """A flat letter as a plain mesh (a text object would show its letter in the UI)."""
    curve = bpy.data.curves.new(name + "_tmp", "FONT")
    curve.body = letter
    curve.size = size
    curve.align_x = "CENTER"
    curve.align_y = "CENTER"
    tmp = bpy.data.objects.new(name + "_tmp", curve)
    bpy.context.scene.collection.objects.link(tmp)
    deps = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(tmp.evaluated_get(deps))
    bpy.data.objects.remove(tmp)
    bpy.data.curves.remove(curve)
    me.name = name
    obj = bpy.data.objects.new(name, me)
    obj.location = location
    me.materials.append(material(mat))
    bpy.context.scene.collection.objects.link(obj)
    return obj


def lock(*objs):
    for o in objs:
        o.hide_select = True


def new_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.unit_settings.system = "METRIC"


def island(lighthouse_at=(-4.0, 3.5)):
    """Ground (top surface at z = 0), sea, and the old lighthouse."""
    ground = cylinder("Ground", 6.0, 1.0, "sand", (0, 0, -0.5), segments=24)
    sea = cylinder("Sea", 40.0, 0.1, "sea", (0, 0, -0.8), segments=32)
    lock(sea)
    x, y = lighthouse_at
    # One object (tower + roof), so a single click selects all of it.
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=16, radius1=0.8, radius2=0.55, depth=4.0)
    roof = bmesh.new()
    bmesh.ops.create_cone(roof, cap_ends=True, segments=16, radius1=0.7, radius2=0.0, depth=0.8)
    bmesh.ops.translate(roof, verts=roof.verts, vec=(0, 0, 2.4))
    for f in roof.faces:
        f.material_index = 1
    tmp = bpy.data.meshes.new("tmp")
    roof.to_mesh(tmp)
    roof.free()
    bm.from_mesh(tmp)
    bpy.data.meshes.remove(tmp)
    tower = mesh_object("Lighthouse", bm, "white", (x, y, 2.0))
    tower.data.materials.append(material("red"))
    return ground, sea, tower


def save(folder, filename):
    path = os.path.join(folder, filename)
    bpy.ops.wm.save_as_mainfile(filepath=path, compress=True)
    print("saved", path)


# ---------------------------------------------------------------- lessons --
def lesson_1(folder):
    """Stones that only line up into the letter from Top view, orthographic."""
    new_scene()
    island()
    rng = random.Random(7)
    rows = LETTERS["B"]
    spacing = 0.8
    ox, oy = 1.0 - 2 * spacing, -0.5 + 3 * spacing
    n = 0
    for r, row in enumerate(rows):
        for c, ch in enumerate(row):
            if ch != "#":
                continue
            h = rng.uniform(0.2, 4.5)
            x, y = ox + c * spacing, oy - r * spacing
            pillar = cylinder("Sea Stack" + (".%03d" % n if n else ""), 0.16, h, "stone", (x, y, h / 2), segments=6)
            bm = bmesh.new()
            bmesh.ops.create_icosphere(bm, subdivisions=1, radius=0.34)
            stone = mesh_object("Stone" + (".%03d" % n if n else ""), bm, "stone", (0, 0, h / 2 + 0.2))
            stone.parent = pillar
            n += 1
    # A few decoys that are not part of the letter.
    for i in range(6):
        a = rng.uniform(0, math.tau)
        d = rng.uniform(3.6, 5.2)
        h = rng.uniform(0.2, 2.0)
        bm = bmesh.new()
        bmesh.ops.create_icosphere(bm, subdivisions=1, radius=0.3)
        mesh_object("Pebble.%03d" % i, bm, "stone", (math.cos(a) * d, math.sin(a) * d, h))
    save(folder, "lesson-1-find-your-bearings.blend")


def lesson_2(folder):
    """Crates piled on a flag. Keep the oil barrel."""
    new_scene()
    island()
    flag = cube("Flag", 1.0, "cloth", (1.5, -1.0, 0.01))
    flag.scale = (1.6, 1.6, 0.02)
    letter = text_mesh("Flag Paint", "E", 1.8, "ink", (1.5, -1.0, 0.03))
    lock(flag, letter)
    cylinder("Oil Barrel", 0.35, 0.9, "oil", (0.6, 0.6, 0.45))
    rng = random.Random(3)
    spots = [(-0.5, -0.5, 0), (0.4, -0.5, 0), (-0.5, 0.4, 0), (0.4, 0.4, 0), (0, 0, 1), (-0.2, 0.3, 2)]
    for i, (dx, dy, level) in enumerate(spots):
        c = cube("Crate" + (".%03d" % i if i else ""), 0.85, "crate", (1.5 + dx, -1.0 + dy, 0.43 + level * 0.85))
        c.rotation_euler.z = rng.uniform(-0.3, 0.3)
    save(folder, "lesson-2-clear-the-wreckage.blend")


def lesson_3(folder):
    """A flagpole lying in the sand. R X 90 stands it up and shows the letter."""
    new_scene()
    island()
    # The pole mesh lies along +Y with its origin at the base. Rotation starts at 0,
    # so after R X 90 the Sidebar reads Rotation X = 90.
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=10, radius1=0.08, radius2=0.08, depth=3.0)
    bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=mathutils.Matrix.Rotation(math.radians(-90), 3, "X"))
    bmesh.ops.translate(bm, verts=bm.verts, vec=(0, 1.5, 0))
    pole = mesh_object("Flagpole", bm, "wood", (0.5, -2.5, -0.05))
    # Cloth flat under the sand, letter side facing up (it faces you once the pole stands).
    cloth = cube("Flag", 1.0, "cloth", (0, 0, 0))
    cloth.scale = (1.2, 0.8, 0.01)
    cloth.parent = pole
    cloth.location = (0.68, 2.45, -0.02)
    letter = text_mesh("Flag Paint", "A", 0.7, "ink", (0, 0, 0))
    letter.parent = pole
    letter.location = (0.68, 2.45, -0.005)
    lock(cloth, letter)
    save(folder, "lesson-3-raise-the-flagpole.blend")


def lesson_4(folder):
    """Loose vertices inside the boulder form the letter (Front view, X-ray)."""
    new_scene()
    island()
    bm = bmesh.new()
    bmesh.ops.create_icosphere(bm, subdivisions=2, radius=1.8)
    rng = random.Random(11)
    for v in bm.verts:
        v.co *= rng.uniform(0.92, 1.06)
    rows = LETTERS["C"]
    cell, dots = 0.3, 3
    for r, row in enumerate(rows):
        for c, ch in enumerate(row):
            if ch != "#":
                continue
            for i in range(dots):
                for j in range(dots):
                    x = (c - 2) * cell + (i - 1) * cell / dots
                    z = (3 - r) * cell + (j - 1) * cell / dots
                    bm.verts.new((x, 0.0, z))
    mesh_object("Boulder", bm, "stone", (0.5, -1.0, 1.5))
    save(folder, "lesson-4-inside-the-boulder.blend")


def lesson_5(folder):
    """A sealed lantern box with the flag inside. Inset, then extrude down."""
    new_scene()
    island()
    cube("Lantern Box", 2.0, "lantern", (1.0, -1.0, 1.0))
    bm = bmesh.new()
    # A ring ("O") lying flat, high inside the box: hidden until the top is dug out.
    major, minor, seg, rings = 0.42, 0.08, 32, 8
    grid = []
    for i in range(seg):
        a = i / seg * math.tau
        ring = []
        for j in range(rings):
            b = j / rings * math.tau
            rr = major + minor * math.cos(b)
            ring.append(bm.verts.new((rr * math.cos(a), rr * math.sin(a), minor * math.sin(b))))
        grid.append(ring)
    for i in range(seg):
        for j in range(rings):
            bm.faces.new((grid[i][j], grid[(i + 1) % seg][j], grid[(i + 1) % seg][(j + 1) % rings], grid[i][(j + 1) % rings]))
    token = mesh_object("Flag", bm, "gold", (1.0, -1.0, 1.4))
    lock(token)
    save(folder, "lesson-5-hollow-the-lantern.blend")


def lesson_6(folder):
    """Blender's own default scene: cube, camera, light."""
    bpy.ops.wm.read_factory_settings(use_empty=False)
    save(folder, "lesson-6-build-the-beacon.blend")


if __name__ == "__main__":
    folder = out_dir()
    for build in (lesson_1, lesson_2, lesson_3, lesson_4, lesson_5, lesson_6):
        build(folder)
    print("Built Signal Island starter scenes with Blender", bpy.app.version_string)
