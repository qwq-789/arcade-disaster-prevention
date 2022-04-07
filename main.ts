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
    if (otherSprite == portal1) {
        tiles.setCurrentTilemap(tilemap`層級3`)
        for (let value of sprites.allOfKind(SpriteKind.portal)) {
            value.destroy()
        }
        pause(100)
        for (let value of tiles.getTilesByType(assets.tile`我的貼圖`)) {
            portal2 = sprites.create(img`
                e e e e e e e e e e e e e e e e 
                d d d d d d d d d d d d d d d d 
                4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 d 
                4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 d 
                e e e e e e e 1 e e e e e e e e 
                d d d d d d 1 1 d d d d d d d d 
                4 4 4 4 4 1 1 1 4 4 4 4 4 4 4 d 
                4 4 4 4 1 1 1 1 1 1 1 1 1 1 4 d 
                e e e 1 1 1 1 1 1 1 1 1 1 1 e e 
                d d d d 1 1 1 1 1 1 1 1 1 1 d d 
                4 4 4 4 4 1 1 1 4 4 4 4 4 4 4 d 
                4 4 4 4 4 4 1 1 4 4 4 4 4 4 4 d 
                e e e e e e e 1 e e e e e e e e 
                d d d d d d d d d d d d d d d d 
                4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 d 
                4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 d 
                `, SpriteKind.portal)
            tiles.placeOnTile(portal2, value)
            portal2.z = -1
        }
        charater.setPosition(30, 121)
        game.splash("進入商店")
        facing = "Right"
        charater.setImage(assets.image`standR`)
    } else if (otherSprite == portal2) {
        tiles.setCurrentTilemap(tilemap`層級1`)
        for (let value of sprites.allOfKind(SpriteKind.portal)) {
            value.destroy()
        }
        pause(100)
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
            tiles.placeOnTile(portal1, value)
            portal1.z = -1
        }
        charater.setPosition(128, 59)
        game.splash("回到大街")
        facing = "Down"
        charater.setImage(assets.image`standD`)
    }
})
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    walk()
})
controller.anyButton.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, charater)
    stopWalk()
})
let portal2: Sprite = null
let facing = ""
let portal1: Sprite = null
let charater: Sprite = null
tiles.setCurrentTilemap(tilemap`層級1`)
charater = sprites.create(assets.image`standD`, SpriteKind.Player)
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
    tiles.placeOnTile(portal1, value)
    portal1.z = -1
}
controller.moveSprite(charater)
scene.cameraFollowSprite(charater)
facing = "Down"
game.onUpdate(function () {
    charater.sayText("" + Math.trunc(charater.x) + "," + Math.trunc(charater.y))
})
