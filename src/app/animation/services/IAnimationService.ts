import {CustomAnimation} from '@src/app/animation/models/CustomAnimation';

export interface IAnimationService<Animation extends CustomAnimation, View> {
    animate<AnimationImpl extends Animation>(view: View, animation: new(...args: any[]) => AnimationImpl, stackable?: boolean): {promise: Promise<any>, animation: Animation};
    cancel(animation: Animation): void;
}
