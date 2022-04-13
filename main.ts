namespace SpriteKind {
    export const tree = SpriteKind.create()
    export const arrow = SpriteKind.create()
    export const coin = SpriteKind.create()
}
function doMap () {
    tiles.setCurrentTilemap(tilemap`層級1`)
    for (let value of tiles.getTilesByType(assets.tile`我的貼圖`)) {
        tree2 = sprites.create(img`
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
        tiles.placeOnTile(tree2, value)
        tiles.setTileAt(value, sprites.skillmap.islandTile4)
        tiles.setWallAt(value, true)
    }
}
function plot () {
    game.splash("你是一名很忙的防疫大使")
    game.splash("你的任務是清除外面的病毒")
    game.splash("並延長你難得的外出時間")
    runText = false
    runText2 = false
}
function end () {
    game.splash("你感染了過量病毒，", "需要在家隔離")
    game.splash("外出時間" + " " + timeMinterWord + ":" + timeSecWord)
    game.over(false)
}
function weaponLevelup () {
    if (info.score() <= 9) {
        runText2 = true
    } else if (info.score() >= 15 && info.score() <= 19) {
        runText2 = true
    } else if (info.score() >= 25 && info.score() <= 29) {
        runText2 = true
    } else if (info.score() >= 35 && info.score() <= 39) {
        runText2 = true
    } else if (info.score() >= 45 && info.score() <= 49) {
        runText2 = true
    } else if (info.score() >= 55 && info.score() <= 59) {
        runText2 = true
    } else if (info.score() >= 65 && info.score() <= 69) {
        runText2 = true
    } else if (info.score() >= 75 && info.score() <= 79) {
        runText2 = true
    } else if (info.score() >= 85 && info.score() <= 89) {
        runText2 = true
    } else if (info.score() >= 95 && info.score() <= 99) {
        runText2 = true
    }
    if (info.score() >= 10 && info.score() < 15) {
        if (runText2) {
            game.splash("政府研發了更有效的疫苗!")
            runText2 = false
            cd = 1000
        }
    } else if (info.score() >= 20 && info.score() < 25) {
        if (runText2) {
            game.splash("政府研發了更有效的疫苗!")
            runText2 = false
            cd = 750
        }
    } else if (info.score() >= 30 && info.score() < 35) {
        if (runText2) {
            game.splash("政府研發了更有效的疫苗!")
            runText2 = false
            cd = 500
        }
    } else if (info.score() >= 40 && info.score() < 45) {
        if (runText2) {
            game.splash("政府研發了更有效的疫苗!")
            ATT = -2
            runText2 = false
            cd = 500
        }
    } else if (info.score() >= 50 && info.score() < 55) {
        if (runText2) {
            game.splash("政府研發了更有效的疫苗!")
            ATT = -3
            runText2 = false
            cd = 500
        }
    } else if (info.score() >= 60 && info.score() < 65) {
        if (runText2) {
            game.splash("政府研發了更有效的疫苗!")
            ATT = -4
            runText2 = false
            cd = 500
        }
    } else if (info.score() >= 70 && info.score() < 75) {
        if (runText2) {
            game.splash("政府研發了更有效的疫苗!")
            ATT = -5
            runText2 = false
            cd = 500
        }
    } else if (info.score() >= 80 && info.score() < 85) {
        if (runText2) {
            game.splash("政府研發了更有效的疫苗!")
            ATT = -6
            runText2 = false
            cd = 500
        }
    } else if (info.score() >= 90 && info.score() < 95) {
        if (runText2) {
            game.splash("政府研發了更有效的疫苗!")
            ATT = -7
            runText2 = false
            cd = 500
        }
    } else if (info.score() >= 100) {
        if (runText2) {
            game.splash("政府研發了更有效的疫苗!")
            ATT = -10
            runText2 = false
            cd = 500
        }
    }
}
function timer () {
    if (timeMinter < 10) {
        timeMinterWord = "0" + timeMinter
    } else {
        timeMinterWord = convertToText(timeMinter)
    }
    if (timeSec < 10) {
        timeSecWord = "0" + timeSec
    } else if (timeSec >= 60) {
        timeMinter += 1
        timeSec = 0
    } else {
        timeSecWord = convertToText(timeSec)
    }
    charater.sayText("" + timeMinterWord + ":" + timeSecWord)
}
function virusLevelup () {
    if (timeSec == 29) {
        runText = true
    }
    if (timeMinter >= 0 && timeMinter < 1) {
        virusMaxHeart = 2
        if (timeSec == 30) {
            if (runText) {
                game.splash("小心!", "病毒的抗藥性上升了")
                runText = false
            }
        }
    } else if (timeMinter >= 1 && timeMinter < 2) {
        virusMaxHeart = 5
        if (timeSec == 30) {
            if (runText) {
                game.splash("小心!", "病毒的抗藥性上升了")
                runText = false
            }
        }
    } else if (timeMinter >= 2 && timeMinter < 3) {
        virusMaxHeart = 8
        if (timeSec == 30) {
            if (runText) {
                game.splash("小心!", "病毒的抗藥性上升了")
                runText = false
            }
        }
    } else if (timeMinter >= 3 && timeMinter < 4) {
        virusMaxHeart = 12
        if (timeSec == 30) {
            if (runText) {
                game.splash("小心!", "病毒的抗藥性上升了")
                runText = false
            }
        }
    } else if (timeMinter >= 4 && timeMinter < 5) {
        virusMaxHeart = 15
        if (timeSec == 30) {
            if (runText) {
                game.splash("小心!", "病毒的抗藥性上升了")
                runText = false
            }
        }
    } else if (timeMinter >= 5 && timeMinter < 6) {
        virusMaxHeart = 18
        if (timeSec == 30) {
            if (runText) {
                game.splash("小心!", "病毒的抗藥性上升了")
                runText = false
            }
        }
    } else if (timeMinter >= 6 && timeMinter < 7) {
        virusMaxHeart = 21
        if (timeSec == 30) {
            if (runText) {
                game.splash("小心!", "病毒的抗藥性上升了")
                runText = false
            }
        }
    } else if (timeMinter >= 7 && timeMinter < 8) {
        virusMaxHeart = 24
        if (timeSec == 30) {
            if (runText) {
                game.splash("小心!", "病毒的抗藥性上升了")
                runText = false
            }
        }
    } else if (timeMinter >= 8 && timeMinter < 9) {
        virusMaxHeart = 27
        if (timeSec == 30) {
            if (runText) {
                game.splash("小心!", "病毒的抗藥性上升了")
                runText = false
            }
        }
    } else if (timeMinter >= 9) {
        virusMaxHeart = 30
        if (timeSec == 30) {
            if (runText) {
                game.splash("小心!", "病毒的抗藥性大幅度上升了")
                game.splash("並且出現了新型變種")
                VirusBoss()
                runText = false
            }
        }
    }
}
sprites.onOverlap(SpriteKind.arrow, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    virusHeart += ATT
    if (virusHeart <= 0) {
        _100dollars = sprites.create(img`
            f f f f f f f f f f f f f f f f f f f f 
            f 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 f 
            f 3 2 3 2 2 2 3 2 2 2 3 3 3 3 3 3 3 3 f 
            f 3 2 3 2 3 2 3 2 3 2 3 3 3 3 3 3 3 3 f 
            f 3 2 3 2 2 2 3 2 2 2 3 3 3 2 2 2 3 3 f 
            f 3 3 3 3 3 3 3 3 3 3 3 3 3 2 2 2 3 3 f 
            f 3 2 3 3 3 3 3 3 3 3 3 3 3 2 2 2 3 3 f 
            f 3 3 3 3 3 3 3 3 3 3 3 3 3 3 2 3 3 3 f 
            f 3 3 3 3 3 3 3 3 3 3 3 3 2 2 2 2 2 3 f 
            f f f f f f f f f f f f f f f f f f f f 
            `, SpriteKind.coin)
        scaling.scaleByPercent(_100dollars, 16, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        _100dollars.setPosition(otherSprite.x, otherSprite.y)
        _100dollars.z = -1
        otherSprite.startEffect(effects.disintegrate, 200)
        otherSprite.destroy()
    }
    if (otherSprite == virusBoss) {
        virusBossHeart += ATT
        if (virusBossHeart <= 0) {
            _1000dollars = sprites.create(img`
                f f f f f f f f f f f f f f f f f f f f 
                f 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 d f 
                f 9 8 9 8 8 8 9 8 8 8 9 8 8 8 9 9 9 d f 
                f 9 8 9 8 9 8 9 8 9 8 9 8 9 8 9 9 9 d f 
                f 9 8 9 8 8 8 9 8 8 8 9 8 8 8 9 9 9 d f 
                f 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 d f 
                f 9 8 9 9 9 9 8 8 9 8 8 9 9 9 9 9 9 d f 
                f 9 9 9 9 9 9 8 8 9 8 8 9 8 8 9 9 9 d f 
                f 9 9 9 9 9 9 9 8 9 9 8 9 8 8 9 9 9 d f 
                f f f f f f f f f f f f f f f f f f f f 
                `, SpriteKind.coin)
            _1000dollars.setPosition(otherSprite.x, otherSprite.y)
            scaling.scaleByPercent(_1000dollars, 24, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            _1000dollars.z = -1
            otherSprite.startEffect(effects.disintegrate, 200)
            otherSprite.destroy()
        }
    }
    music.zapped.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.coin, function (sprite, otherSprite) {
    otherSprite.startEffect(effects.confetti, 200)
    otherSprite.destroy()
    if (otherSprite == _1000dollars) {
        info.changeScoreBy(10)
    } else {
        info.changeScoreBy(1)
    }
    music.magicWand.play()
})
function Virus () {
    virus = sprites.create(assets.image`virus`, SpriteKind.Enemy)
    virusHeart = 1
    virusMaxHeart = 1
    if (isBorn) {
        virusHeart = virusMaxHeart
        isBorn = false
    }
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
    scene.cameraFollowSprite(charater)
    ATT = -1
    cd = 2000
}
function VirusBoss () {
    virusBoss = sprites.create(assets.image`virus2`, SpriteKind.Enemy)
    scaling.scaleByPercent(virusBoss, 50, ScaleDirection.Uniformly, ScaleAnchor.Middle)
    virusBossHeart = 40
    animation.runImageAnimation(
    virusBoss,
    assets.animation`我的動畫0`,
    150,
    true
    )
    virusBoss.setPosition(randint(0, 1020), randint(0, 1020))
    if (spriteutils.distanceBetween(virusBoss, charater) < 30) {
        virusBoss.destroy()
        VirusBoss()
    } else {
        virusBoss.follow(charater, 40)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.startEffect(effects.disintegrate, 200)
    otherSprite.destroy()
    if (otherSprite == virusBoss) {
        info.changeLifeBy(-3)
    } else {
        info.changeLifeBy(-1)
    }
    music.powerDown.play()
})
let vaccine: Sprite = null
let isBorn = false
let virus: Sprite = null
let _1000dollars: Sprite = null
let virusBossHeart = 0
let virusBoss: Sprite = null
let _100dollars: Sprite = null
let virusHeart = 0
let virusMaxHeart = 0
let charater: Sprite = null
let ATT = 0
let cd = 0
let timeSecWord = ""
let timeMinterWord = ""
let runText2 = false
let runText = false
let tree2: Sprite = null
let timeSec = 0
let timeMinter = 0
timeMinter = 0
timeSec = 0
doMap()
doCharacter()
walkAnimate()
plot()
game.onUpdate(function () {
    timer()
    virusLevelup()
})
game.onUpdateInterval(cd - 400, function () {
    isBorn = true
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
    for (let value2 of spriteutils.getSpritesWithin(SpriteKind.Enemy, 100, charater)) {
        spriteutils.setVelocityAtAngle(vaccine, spriteutils.angleFrom(charater, value2), 100)
    }
    vaccine.setKind(SpriteKind.arrow)
    weaponLevelup()
    pause(cd)
})
game.onUpdateInterval(1000, function () {
    if (1000 < game.runtime()) {
        timeSec += 1
    }
})
