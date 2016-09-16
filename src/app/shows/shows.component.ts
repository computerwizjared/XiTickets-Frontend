import { Component, OnInit } from '@angular/core';

import { SessionStorage } from 'ng2-webstorage';
import * as moment from 'moment';

import { Show, Event, ShowService, EventService } from './shared/index';

@Component({
  moduleId: module.id,
  selector: 'app-shows',
  templateUrl: 'shows.component.html',
  styleUrls: [ 'shows.component.css' ],
  providers: [ ShowService, EventService ]
})
export class ShowsComponent implements OnInit {
  isDetailsCollapsed: boolean = true;
  hovering: number = null;
  shows: Show[];
  events: Event[];
  days: string[] = [];

  @SessionStorage() selectedShow: number = null;
  @SessionStorage() selectedEvent: number = null;
  @SessionStorage() adultTickets: number = 0;
  @SessionStorage() childTickets: number = 0;

  constructor(private showService: ShowService, private eventService: EventService) { }

  getShows(): void {
    this.showService.getShows().then(retrievedShows => {
      this.shows = retrievedShows;
    });
  }

  getEvents(): void {
    this.eventService.getEvents().then(retrievedEvents => {
      this.events = retrievedEvents;
      this.events.forEach(event => {
        let day: string = event.date.toDateString();
        if (this.days.indexOf(day) === -1) {
          this.days.push(day);
        }
      });
    });
  }

  ngOnInit(): void {
    this.getShows();
    this.getEvents();
  }

  onShowClick(id: number): void {
    this.isDetailsCollapsed = false;
    this.selectedShow = id;
  }

  getEventsOnDay(day: string): Event[] {
    let eventsOnDay: Event[] = [];
    this.events.forEach(event => {
      if (event.date.toDateString() === day) {
        eventsOnDay.push(event);
      }
    });
    return eventsOnDay;
  }

  getTimeFromDate(date: Date): string {
    return moment(date).format('h:mmA');
  }
}