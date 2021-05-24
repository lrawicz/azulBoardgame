import { Component, OnInit } from '@angular/core';

export interface room {
  Id: number,
  State: string,
}
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {
  //displayedColumns= ["Id","State"]
  dataSource=[

    { seqNo: "1", description: 'Rajesh', duration: 'rajesh@gmail.com' },

    { seqNo: "2", description: 'Paresh', duration: 'paresh@gmail.com' },

    { seqNo: "3", description: 'Naresh', duration: 'naresh@gmail.com' },

    { seqNo: "4", description: 'Suresh', duration: 'suresh@gmail.com' },

    { seqNo: "5", description: 'Karan', duration: 'karan@gmail.com' },

  ];

  displayedColumns = ['seqNo', 'description', 'duration'];

  constructor() {
  }




  ngOnInit(): void {

  }

}
