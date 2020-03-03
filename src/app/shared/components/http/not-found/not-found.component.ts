import { Component, OnInit } from '@angular/core';

/**
 * Error page component displayed when 404 occurred.
 */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  /**
   * Constructor.
   */
  constructor() { }

  /**
   * Refers to {@link OnInit}
   */
  ngOnInit() {
  }

}
