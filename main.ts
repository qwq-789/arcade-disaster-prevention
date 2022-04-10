namespace SpriteKind {
    export const portal = SpriteKind.create()
    export const tree = SpriteKind.create()
    export const arrow = SpriteKind.create()
    export const coin = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.arrow, SpriteKind.Enemy, function (sprite, otherSprite) {
    coin = sprites.create(img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 1 1 d 5 b 
        b 5 1 5 5 1 5 b 
        c 5 1 5 5 1 5 c 
        c 5 d 1 1 5 5 c 
        . f 5 5 5 5 f . 
        . . f f f f . . 
        `, SpriteKind.coin)
    coin.setPosition(otherSprite.x, otherSprite.y)
    coin.z = -1
    sprite.destroy()
    otherSprite.destroy()
    music.zapped.play()
})
function doMap () {
    tiles.setCurrentTilemap(tilemap`層級1`)
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
}
function timer () {
    timeMinter = Math.trunc(game.runtime() / 1000 / 60)
    timeSec = Math.trunc(game.runtime() / 1000)
    if (timeMinter < 10) {
        timeMinterword = "0" + timeMinter
    } else {
        timeMinterword = convertToText(timeMinter)
    }
    if (timeSec >= 60) {
        timeSec += -60
        timeSec = timeSec
    }
    if (timeSec < 10) {
        timeSecword = "0" + timeSec
    } else {
        timeSecword = convertToText(timeSec)
    }
    charater.sayText("" + timeMinterword + ":" + timeSecword)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.coin, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
    music.magicWand.play()
})
function Virus () {
    virus = sprites.create(assets.image`virus`, SpriteKind.Enemy)
    animation.runImageAnimation(
    virus,
    assets.animation`我的動畫`,
    150,
    true
    )
    virus.setPosition(randint(0, 1020), randint(0, 1020))
    virus.follow(charater, 30)
}
function walkAnimate () {
    characterAnimations.loopFrames(
    charater,
    assets.animation`walkU`,
    100,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    charater,
    assets.animation`walkD`,
    100,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    charater,
    assets.animation`walkL`,
    100,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    charater,
    assets.animation`walkR`,
    100,
    characterAnimations.rule(Predicate.MovingRight)
    )
}
function doCharacter () {
    charater = sprites.create(assets.image`standD`, SpriteKind.Player)
    info.setLife(10)
    info.setScore(0)
    controller.moveSprite(charater)
    charater.setPosition(510, 510)
    charater.setBounceOnWall(false)
    scene.cameraFollowSprite(charater)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
    music.powerDown.play()
})
let arrow: Sprite = null
let virus: Sprite = null
let charater: Sprite = null
let timeSecword = ""
let timeMinterword = ""
let timeSec = 0
let timeMinter = 0
let tree: Sprite = null
let coin: Sprite = null
doMap()
doCharacter()
walkAnimate()
game.onUpdate(function () {
    timer()
})
game.onUpdateInterval(1000, function () {
    Virus()
})
forever(function () {
    arrow = sprites.createProjectileFromSprite(img`
        . . . b . . . . 
        . . . b b . . . 
        . . . b b . . . 
        b b b b b b b b 
        b 7 7 7 7 7 7 b 
        b 7 7 7 7 5 5 b 
        b 7 7 7 7 7 5 b 
        b 7 7 7 7 7 5 b 
        b 7 7 7 7 7 5 b 
        b 7 7 7 7 7 7 b 
        b 7 7 7 7 7 5 b 
        b b b b b b b b 
        b . . b b . . b 
        b b b b b b b b 
        . . . b b . . . 
        . . . b b . . . 
        . b b b b b b . 
        . . . b b . . . 
        . . . b b . . . 
        b b b b b b b b 
        `, charater, 0, 0)
    arrow.setKind(SpriteKind.arrow)
    arrow.follow(virus)
    pause(2000)
})
