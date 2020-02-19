import {MobileAnimation} from '@src/app/animation/models/MobileAnimation';
import {AnimationDefinition} from '@nativescript/core/ui/animation';
import {View} from '@nativescript/core';
import {AnimationCurve} from '@nativescript/core/ui/enums';

export class TapAnimation extends MobileAnimation {

    constructor(view: View, duration?: number, iteration?: number, delay?: number, originX?: number, originY?: number) {
        if (!originX) { originX = 0.5; }
        if (!originY) { originY = 0.5; }
        if (!delay) { delay = 0; }
        if (!iteration) { iteration = 1; }
        if (!duration) { duration = 200; }
        super(duration, iteration, delay, view, originX, originY);
    }

    animate(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            resolve(super.animate().then(() => {
                this.setOrigins();
                return this.loopAnimation(0, [this.normalAnimation(), this.reverseAnimation()]);
            }));
        });
    }

    private normalAnimation(): AnimationDefinition {
        return {
            delay: this.delay,
            target: this.view,
            scale: {x: 0.6, y: 0.6},
            opacity: 0.6,
            duration: this.duration / 2,
            curve: AnimationCurve.easeOut,
            iterations: 1
        };
    }

    private reverseAnimation(): AnimationDefinition {
        return {
            target: this.view,
            scale: {x: 1, y: 1},
            opacity: 1,
            duration: this.duration / 2,
            curve: AnimationCurve.easeIn,
            iterations: 1
        };
    }

}
