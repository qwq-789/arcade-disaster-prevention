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
    virusHeart += -1
    if (virusHeart == 0) {
        otherSprite.startEffect(effects.disintegrate, 200)
        otherSprite.destroy()
    }
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
function plot () {
    game.splash("你是一名很忙的防疫大使")
    game.splash("你的任務是清除外面的病毒")
    game.splash("並延長你難得的外出時間")
    runText = true
    runText2 = true
    counter = 1
}
function end () {
    game.splash("你感染了過量病毒，", "需要在家隔離")
    game.splash("外出時間" + " " + timeMinterword + ":" + timeSecword)
    game.over(false)
}
function timer () {
    timeMinter = Math.trunc(timeSec / 60)
    timeSec = Math.trunc(game.runtime() / 1000)
    if (timeMinter < 10) {
        timeMinterword = "0" + timeMinter
    } else {
        timeMinterword = convertToText(timeMinter)
    }
    if (timeSec < 10) {
        timeSecword = "0" + timeSec
    } else if (timeSec / 60 == counter) {
        counter += 1
        timeSecword = convertToText(timeSec / 60 - (counter - 1))
    } else {
        timeSecword = convertToText(timeSec)
    }
    charater.sayText("" + timeMinterword + ":" + timeSecword)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.coin, function (sprite, otherSprite) {
    otherSprite.startEffect(effects.confetti, 200)
    otherSprite.destroy()
    info.changeScoreBy(1)
    runText = true
    runText2 = true
    music.magicWand.play()
})
function Virus () {
    virus = sprites.create(assets.image`virus`, SpriteKind.Enemy)
    virusHeart = 1
    animation.runImageAnimation(
    virus,
    assets.animation`我的動畫`,
    150,
    true
    )
    virus.setPosition(randint(0, 1020), randint(0, 1020))
    if (spriteutils.distanceBetween(virus, charater) < 30) {
        virus.destroy()
    } else {
        virus.follow(charater, 30)
    }
}
info.onLifeZero(function () {
    end()
})
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
    info.setLife(3)
    info.setScore(0)
    controller.moveSprite(charater)
    charater.setPosition(510, 510)
    charater.setBounceOnWall(true)
    scene.cameraFollowSprite(charater)
    cd = 2000
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.startEffect(effects.disintegrate, 200)
    otherSprite.destroy()
    info.changeLifeBy(-1)
    music.powerDown.play()
})
let vaccine: Sprite = null
let cd = 0
let virus: Sprite = null
let charater: Sprite = null
let timeSec = 0
let timeMinter = 0
let timeSecword = ""
let timeMinterword = ""
let counter = 0
let runText2 = false
let runText = false
let tree: Sprite = null
let virusHeart = 0
let coin: Sprite = null
doMap()
doCharacter()
walkAnimate()
plot()
game.onUpdateInterval(cd - 400, function () {
    Virus()
})
forever(function () {
    vaccine = sprites.createProjectileFromSprite(img`
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
        `, charater, 100, 0)
    spriteutils.setVelocityAtAngle(vaccine, randint(0, 360), 100)
    for (let value of spriteutils.getSpritesWithin(SpriteKind.Enemy, 100, charater)) {
        spriteutils.setVelocityAtAngle(vaccine, spriteutils.angleFrom(charater, value), 100)
    }
    vaccine.setKind(SpriteKind.arrow)
    if (info.score() >= 10 && info.score() < 20) {
        if (runText2) {
            game.splash("政府研發了更有效的疫苗!")
            runText2 = false
            cd = 1000
        }
    } else if (info.score() >= 20 && info.score() < 30) {
        if (runText2) {
            game.splash("政府研發了更有效的疫苗!")
            runText2 = false
            cd = 750
        }
    } else if (info.score() > 30) {
        if (runText2) {
            game.splash("政府研發了更有效的疫苗!")
            runText2 = false
            cd = 500
        }
    }
    pause(cd)
})
game.onUpdate(function () {
    timer()
    if (timeSec == 60) {
        if (runText) {
            virusHeart = 5
            game.splash("小心!", "病毒的抗藥性上升了")
            runText = false
        }
    } else if (timeSec == 120) {
        if (runText) {
            virusHeart = 10
            game.splash("小心!", "病毒的抗藥性上升了")
            runText = false
        }
    } else if (timeSec == 180) {
        if (runText) {
            virusHeart = 15
            game.splash("小心!", "病毒的抗藥性上升了")
            runText = false
        }
    }
})
