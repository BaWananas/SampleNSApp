import {IAnimationService} from '@src/app/animation/services/IAnimationService';
import {MobileAnimation} from '@src/app/animation/models/MobileAnimation';
import {View} from '@nativescript/core';

export interface IMobileAnimationService extends IAnimationService<MobileAnimation, View> {
}

