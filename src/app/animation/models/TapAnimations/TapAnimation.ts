import {MobileAnimation} from '@src/app/animation/models/MobileAnimation';
import {Animation, AnimationDefinition, Cancelable} from '@nativescript/core/ui/animation';
import {View} from '@nativescript/core';
import {AnimationCurve} from '@nativescript/core/ui/enums';

export class TapAnimation extends MobileAnimation {

    constructor(view: View, duration?: number, iteration?: number, delay?: number, originX?: number, originY?: number) {
        if (!originX) { originX = 0; }
        if (!originY) { originY = 0; }
        if (!delay) { delay = 0; }
        if (!iteration) { iteration = 1; }
        if (!duration) { duration = 250; }
        super(duration, iteration, delay, view, originX, originY);
    }

    animate(): Promise<void> & Cancelable {
        this.setOrigins();
        const animation: Animation = new Animation([
            this.normalAnimation(),
            this.reverseAnimation(),
        ], true);

        if (this.iteration === Number.POSITIVE_INFINITY) {
            // TODO
        } else {
            let count = 0;
            return animation.play(false);
        }
    }

    private normalAnimation(): AnimationDefinition {
        return {
            target: this.view,
            scale: {x: 0.7, y: 0.7},
            opacity: 0.7,
            duration: this.duration / 2,
            curve: AnimationCurve.easeOut
        };
    }

    private reverseAnimation(): AnimationDefinition {
        return {
            target: this.view,
            scale: {x: 1, y: 1},
            opacity: 1,
            duration: this.duration / 2,
            curve: AnimationCurve.easeIn
        };
    }

}
