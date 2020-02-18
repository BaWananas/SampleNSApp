import {CustomAnimation} from '@src/app/animation/models/CustomAnimation';
import {AnimationPromise} from '@nativescript/core/ui/animation';
import {View} from '@nativescript/core';

export abstract class MobileAnimation extends CustomAnimation {

    protected constructor(duration: number,
                          iteration: number,
                          delay: number,
                          public view: View,
                          public originX: number,
                          public originY: number) {
        super(duration, iteration, delay);
    }

    public abstract animate(): AnimationPromise;

    protected setOrigins(): void {
        this.view.originX = this.originX;
        this.view.originY = this.originY;
    }
}
