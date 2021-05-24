import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.sass']
})
export class LobbyComponent implements OnInit {
  dataSource:any = []
  displayedColumns = ["id", "waiting", "mode"];
  constructor() {
  }
  ngOnInit(): void {


    

    this.dataSource.push(
      { "id": 1, "status": "waiting", "players": 5, "mode": "normal" }
    )
    this.dataSource.push(
      { "id": 2, "status": "waiting", "players": 5, "mode": "normal" }
    )
    this.dataSource.push(
      { "id": 3, "status": "waiting", "players": 5, "mode": "normal" }
    )
  }
  modalCreateGame() {
    console.log("12346")
  }
  clickrow(event:any) {
    console.log(event)
  }

}
