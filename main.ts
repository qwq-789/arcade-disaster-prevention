namespace SpriteKind {
    export const portal = SpriteKind.create()
    export const tree = SpriteKind.create()
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
function Virus () {
    virus = sprites.create(img`
        . . . . . . 6 . . . . 6 . . . . 
        . . . . . . 6 6 . . 6 8 . 6 . . 
        . . 6 . . . 8 6 . 6 8 . 6 6 . . 
        . . 6 6 6 . 8 6 6 6 6 6 6 8 . . 
        . . 8 8 6 6 6 6 6 6 6 6 8 . . 6 
        . . . . 6 6 6 6 6 6 6 6 6 6 6 8 
        6 6 . . 6 5 2 6 6 6 5 2 6 6 8 . 
        8 6 6 6 6 6 6 6 6 6 6 6 6 6 . . 
        . 8 8 6 6 6 6 e e e 6 6 6 6 6 6 
        . . . 6 6 6 e e e 2 2 6 6 6 8 8 
        . . . 6 6 6 e 2 2 2 2 6 6 6 . . 
        . 6 6 6 6 6 6 2 2 2 6 6 6 6 6 . 
        . 8 8 8 8 6 6 6 6 6 6 6 8 8 6 6 
        . . . . . 6 6 6 6 6 6 6 6 . 8 6 
        . . . 6 6 6 8 . 6 8 . 8 6 . . 8 
        . . . 6 8 8 . . 6 8 . 8 6 6 . . 
        `, SpriteKind.Enemy)
    virus.setPosition(randint(0, 1020), randint(0, 1020))
    virus.follow(charater, 30)
}
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    walk()
})
controller.anyButton.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, charater)
    stopWalk()
})
let timeSecword = ""
let timeMinterword = ""
let timeSec = 0
let timeMinter = 0
let virus: Sprite = null
let tree: Sprite = null
let facing = ""
let charater: Sprite = null
tiles.setCurrentTilemap(tilemap`層級1`)
charater = sprites.create(assets.image`standD`, SpriteKind.Player)
controller.moveSprite(charater, 100, 100)
scene.cameraFollowSprite(charater)
facing = "Down"
charater.setPosition(510, 510)
charater.setBounceOnWall(false)
for (let value of tiles.getTilesByType(assets.tile`我的貼圖`)) {
    tree = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . c c c c 6 . . . . . 
        . . . . c c 6 7 7 5 5 6 6 . . . 
        . . c c 6 6 6 6 7 5 5 7 c c . . 
        . c 6 6 6 7 7 7 7 7 7 5 6 c c . 
        . c 6 6 7 7 7 5 7 6 7 7 7 6 c c 
        c 6 6 7 7 6 7 7 7 6 7 7 6 6 6 c 
        c c 6 6 6 7 6 7 6 6 6 6 5 7 6 c 
        c c c c 6 7 7 6 7 7 7 6 7 6 6 c 
        . c c 6 6 6 6 c 6 6 6 6 6 c c c 
        . c c 6 6 c 6 6 c 6 c 6 6 c c . 
        . . c c f f 6 6 c f f c c f . . 
        . . . . c f c c c f c f f . . . 
        . . . . . 4 f f f c . e . . . . 
        . . . . . . e e e . . 4 . . . . 
        . . . . . . . e e . e . . . . . 
        `, SpriteKind.tree)
    tiles.placeOnTile(tree, value)
    tiles.setTileAt(value, sprites.skillmap.islandTile4)
    tiles.setWallAt(value, true)
}
game.onUpdate(function () {
    timeMinter = Math.trunc(game.runtime() / 1000 / 60)
    timeSec = Math.trunc(game.runtime() / 1000)
    if (timeMinter < 10) {
        timeMinterword = "0" + timeMinter
    } else {
        timeMinterword = convertToText(timeMinter)
    }
    if (timeSec >= 60) {
        timeSec += -60
    }
    if (timeSec < 10) {
        timeSecword = "0" + timeSec
    } else {
        timeSecword = convertToText(timeSec)
    }
    charater.sayText("" + timeMinterword + ":" + timeSecword)
})
game.onUpdateInterval(5000, function () {
    Virus()
})
