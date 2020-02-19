import {Injectable} from '@angular/core';
import {IMobileAnimationService} from '@src/app/animation/services/IMobileAnimationService';
import {MobileAnimation} from '@src/app/animation/models/MobileAnimation';
import {View} from '@nativescript/core';

@Injectable({
  providedIn: 'root'
})
export class MobileAnimationService implements IMobileAnimationService {

  private static createAnimationImpl<T>(type: new(...args: any[]) => T ): T {
    return new type();
  }

  private static pushAnimation(animation: MobileAnimation): void {
    animation.view.isEnabled = false;
  }

  private static removeAnimation(animation: MobileAnimation): void {
    if (this.isAnimationRunning(animation)) {
      animation.view.isEnabled = true;
    }
  }

  private static isAnimationRunning(animation: MobileAnimation): boolean {
    return (!animation.view.isEnabled);
  }

  constructor() {}

  animate<AnimationImpl extends MobileAnimation>(view: View,
                                                 animation: new(...args: any[]) => AnimationImpl,
                                                 stackable = false): {promise: Promise<any>, animation: MobileAnimation} {
    const concreteAnimation: MobileAnimation = MobileAnimationService.createAnimationImpl<AnimationImpl>(animation);
    concreteAnimation.view = view;

    if (!stackable && MobileAnimationService.isAnimationRunning(concreteAnimation)) {
      console.log('Animation still running');
      return null;
    }

    if (!stackable) {
      MobileAnimationService.pushAnimation(concreteAnimation);
    }

    const animationPromise: Promise<any> = concreteAnimation.animate().then(() => {
      console.log('Remove animation.');
      MobileAnimationService.removeAnimation(concreteAnimation);
    }).catch(e => {
      console.log('Error occurred during animation : ' + e);
      MobileAnimationService.removeAnimation(concreteAnimation);
    });

    return {promise: animationPromise, animation: concreteAnimation};
  }

  cancel(animation: MobileAnimation): void {
    animation.cancelled = true;
    MobileAnimationService.removeAnimation(animation);
  }

}
