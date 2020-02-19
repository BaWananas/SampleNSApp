import {CustomAnimation} from '@src/app/animation/models/CustomAnimation';
import {AnimationDefinition, View} from '@nativescript/core';

export abstract class MobileAnimation extends CustomAnimation {

    protected constructor(duration: number,
                          iteration = 1,
                          delay = 0,
                          public view: View,
                          public originX = 0,
                          public originY = 0,
                          public cancelled = false) {
        super(duration, iteration, delay);
    }

    public animate(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.view.on('unloaded', args => {
                this.cancelled = true;
                console.log('Unload view component.');
            });
            resolve();
            return;
        });
    }

    protected setOrigins(): void {
        this.view.originX = this.originX;
        this.view.originY = this.originY;
    }

    protected async loopAnimation(count: number, animations: AnimationDefinition[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (this.cancelled) {
                console.log('Animation cancelled.');
                resolve();
                return;
            } else {
                if (this.iteration > count) {
                    count = count + 1;
                    resolve(this.doAnimations(animations, 0).then(() => this.loopAnimation(count, animations)));
                    return;
                } else {
                    console.log('No remaining loops; stop animation.');
                    resolve();
                    return;
                }
            }
        });
    }

    private async doAnimations(animations: AnimationDefinition[], index: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (index >= animations.length) {
                resolve();
                return;
            } else {
                resolve(this.view.animate(animations[index]).then( value => {
                    return this.doAnimations(animations, index + 1);
                }));
                return;
            }
        });
    }
}
