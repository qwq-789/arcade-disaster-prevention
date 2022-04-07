namespace SpriteKind {
    export const portal = SpriteKind.create()
}
function walk () {
    if (controller.up.isPressed()) {
        animation.runImageAnimation(
        charater,
        assets.animation`walkU`,
        100,
        true
        )
        facing = "Up"
    } else if (controller.down.isPressed()) {
        animation.runImageAnimation(
        charater,
        assets.animation`walkD`,
        100,
        true
        )
        facing = "Down"
    } else if (controller.left.isPressed()) {
        animation.runImageAnimation(
        charater,
        assets.animation`walkL`,
        100,
        true
        )
        facing = "Left"
    } else if (controller.right.isPressed()) {
        animation.runImageAnimation(
        charater,
        assets.animation`walkR`,
        100,
        true
        )
        facing = "Right"
    }
}
function stopWalk () {
    if (facing == "Up") {
        charater.setImage(assets.image`standB`)
    } else if (facing == "Down") {
        charater.setImage(assets.image`standD`)
    } else if (facing == "Left") {
        charater.setImage(assets.image`standL`)
    } else if (facing == "Right") {
        charater.setImage(assets.image`standR`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.portal, function (sprite, otherSprite) {
    let value = ""
    tiles.setCurrentTilemap(tilemap`層級3`)
    for (let value of tiles.getTilesByType(sprites.builtin.forestTiles10)) {
        portal1 = sprites.create(img`
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            `, SpriteKind.portal)
        tiles.placeOnTile(portal1, tiles.getTilesByType(sprites.builtin.forestTiles10)[value])
        portal1.z = -1
    }
    charater.setPosition(7, 121)
    facing = value
    charater.setImage(assets.image`standR`)
})
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    walk()
})
controller.anyButton.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, charater)
    stopWalk()
})
let facing = ""
let portal1: Sprite = null
let charater: Sprite = null
tiles.setCurrentTilemap(tilemap`層級1`)
charater = sprites.create(assets.image`standD`, SpriteKind.Player)
for (let value of tiles.getTilesByType(sprites.builtin.forestTiles10)) {
    let list: Image = null
    portal1 = sprites.create(img`
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        `, SpriteKind.portal)
    tiles.placeOnTile(portal1, tiles.getTilesByType(list)[value])
    portal1.z = -1
}
controller.moveSprite(charater)
scene.cameraFollowSprite(charater)
facing = "Down"
game.onUpdate(function () {
    charater.sayText("" + Math.trunc(charater.x) + "," + Math.trunc(charater.y))
})
