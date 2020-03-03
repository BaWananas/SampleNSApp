import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TitleNavBarCommon} from '@src/app/shared/components/navigation/title-nav-bar/title-nav-bar.common';
import {faArrowLeft, faHome} from '@fortawesome/free-solid-svg-icons';

/**
 * Web implementation of {@link TitleNavBarCommon}
 */
@Component({
  selector: 'app-title-nav-bar',
  templateUrl: './title-nav-bar.component.html',
  styleUrls: ['./title-nav-bar.component.css']
})
export class TitleNavBarComponent extends TitleNavBarCommon implements OnInit {

  /**
   * Backward URL (can be different to the real backward url).
   */
  @Input() backUrl: string;
  /**
   * Home URL.
   */
  @Input() homeUrl: string;

  /**
   * Backward button icon.
   */
  public backIcon = faArrowLeft;
  /**
   * Home button icon.
   */
  public homeIcon = faHome;

  /**
   * Constructor.
   * @param router Angular router.
   */
  constructor(private router: Router) {
    super();
  }

  /**
   * Refers to {@link OnInit}.
   */
  ngOnInit() {
  }

  /**
   * Refers to {@link TitleNavBarCommon}
   */
  goBack(): void {
    this.router.navigate([this.backUrl]);
  }

  /**
   * Refers to {@link TitleNavBarCommon}
   */
  goHome(): void {
    this.router.navigate([this.homeUrl]);
  }

}
