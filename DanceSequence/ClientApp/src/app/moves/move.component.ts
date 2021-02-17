import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Dance } from '../model/dance';
import { Move } from '../model/move';
import { AddMove } from '../model/addMove';
import { ConnectMoves } from '../model/connectMoves';
import { AddTags } from '../model/addTags';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MoveDetails } from '../model/moveDetails';
import { Tag } from '../model/tag';
import { Alternation } from '../model/alternation';
import { AddAlternation } from '../model/addAlternation';

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.css']
})
export class MoveComponent {

  public dances: Dance[] = null;
  public moves: Move[] = null;
  public currentDanceId: number | null;
  public currentMove: MoveDetails | null;
  submitted: boolean = false;

  public currentPage: number = 0;
  public update: boolean;
  public add: boolean;

  public choosenMoves: Move[];
  public availableMoves: Move[];
  public alternations: Alternation[];
  public choosenTags: Tag[];
  public availableTags: Tag[];

  moveForm: FormGroup;
  alternationForm: FormGroup;

  constructor(public main: AppComponent, public formBuilder: FormBuilder) {

    this.moveForm = this.formBuilder.group({
      moveName: ['', [Validators.required, Validators.minLength(3)]],
      moveDescription: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.alternationForm = this.formBuilder.group({
      alternationName: ['', [Validators.required, Validators.minLength(3)]],
      alternationDescription: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    this.main.moveService.GetDances().subscribe(
      data => {
        this.dances = [];

        for (let i of data) {
          console.log(i);
          console.log(i["id"]);
          console.log(i["name"]);
          this.dances.push(new Dance(i["id"], i["name"]));
        }
        this.dances.unshift(new Dance(0, "*Wybierz"))
      }
    )
  }

  changeDance(id: number) {
    this.currentMove = null;
    this.moves = null;
    this.currentDanceId = 0;

    if (id == 0)
      return 0;

    this.main.moveService.GetMoves(id).subscribe(
      data => {
        this.currentDanceId = id;
        console.log(data);
        this.moves = data as Move[];
      }
    )
  }

  selectMove(id: number) {
    this.main.moveService.GetMoveDetails(id).subscribe(
      data => {
        console.log(data);
        this.currentMove = data as MoveDetails;
      }
    )
    console.log(this.currentMove.alternations);
  }

  deleteMove(moveId: number) {
    this.main.moveService.DeleteMove(moveId).subscribe(
      data => {
        this.currentMove = null;
        this.main.moveService.GetMoves(this.currentDanceId).subscribe(
          data => {
            console.log(data);
            this.moves = data as Move[];
          }
        )
      }
    )
  }

  addMoveProcess() {
    this.add = true;
    this.update = false;
    this.goSection(1);
  }

  goUpdateSection(page: number) {
    this.add = false;
    this.update = true;
    this.goSection(page);
  }


  goSection(page: number) {
    this.currentPage = page;
    console.log("goTo:" + page);
    if (page == 2 || page == 4) {
      this.main.moveService.GetMoves(this.currentDanceId).subscribe(
        data => {
          this.availableMoves = data as Move[];
          this.availableMoves.filter(x => x.id == this.currentMove.id);
          this.availableMoves.unshift(new Move(0, "*Wybierz", ""));
          if (this.update) {
            if (page == 2)
              this.choosenMoves = this.currentMove.preMoves;
            else
              this.choosenMoves = this.currentMove.proMoves;
          }
          else {
            this.choosenMoves = [];
          }

        }
      )
    }
    if (page == 1) {
      this.dances.splice(0, 1);
    }
    if (page == 3) {
      if (this.add)
        this.alternations = [];
      else {
        this.alternations = this.currentMove.alternations;
      }
    }
    if (page == 5) {
      this.main.tagService.GetTags().subscribe(
        data => {
          console.log(data);
          this.availableTags = data as Tag[];
          this.availableTags.unshift(new Tag(0, "*Wybierz", ""));
          console.log(this.availableTags);
          if (this.update) {
            this.choosenTags = this.currentMove.tags;
          }
          else {
            this.choosenTags = [];
          }
        }
      )
    }

    if (page == 0) {
      this.add = false;
      this.update = false;
      if (this.dances[0].name != "*Wybierz")
        this.dances.unshift(new Dance(0, "*Wybierz"));
      this.main.moveService.GetMoves(this.currentDanceId).subscribe(
        data => {
          console.log(data);
          this.moves = data as Move[];
        }
      )
    }
  }

  chooseMove(moveIndex: number) {
    var move = this.availableMoves[moveIndex];
    this.choosenMoves.push(move);
    this.availableMoves.splice(moveIndex, 1);
  }

  unchooseMove(moveIndex: number) {
    var move = this.choosenMoves[moveIndex];
    this.choosenMoves.splice(moveIndex, 1);
    this.availableMoves.push(move);
  }

  chooseTag(tagIndex: number) {
    var tag = this.availableTags[tagIndex];
    this.choosenTags.push(tag);
    this.availableTags.splice(tagIndex, 1);
  }

  unchooseTag(tagIndex: number) {
    var tag = this.choosenTags[tagIndex];
    this.choosenTags.splice(tagIndex, 1);
    this.availableTags.push(tag);
  }
  addAlternation() {
    if (this.alternationForm.invalid) {
      return;
    }
    console.log(this.alternationForm.controls.alternationName.value);
    this.alternations.push(new Alternation(0, this.alternationForm.controls.alternationName.value, this.alternationForm.controls.alternationDescription.value))
    console.log(this.alternations);
    this.alternationForm.setValue(
      {
        alternationName: "",
        alternationDescription: ""
      }
    )
  }

  deleteAlternation(index: number) {
    this.alternations.splice(index, 1);
  }

  saveMoveBase() {

    if (this.moveForm.invalid) {
      return;
    }

    if (this.add) {
      this.main.moveService.AddMove(new AddMove(0, this.moveForm.controls.moveName.value, this.moveForm.controls.moveDescription.value, this.currentDanceId)).subscribe
        (
          data => {
            let moveTemp = data as Move;
            this.main.moveService.GetMoveDetails(moveTemp.id).subscribe(
              data2 => {
                this.currentMove = data2 as MoveDetails;
              }
            )
          }
        )
      this.goSection(this.currentPage = this.currentPage + 1);
    }
    if (this.update) {
      this.main.moveService.UpdateMove(new AddMove(this.currentMove.id, this.moveForm.controls.moveName.value, this.moveForm.controls.moveDescription.value, this.currentDanceId)).subscribe
        (
          data => {
            let tmp = data as boolean;
            if (tmp) {
              this.main.moveService.GetMoveDetails(this.currentMove.id,).subscribe
                (
                  data2 => {
                    this.currentMove = data2 as MoveDetails;
                  }
                )
            }
          }
        )
      this.goSection(0);

    }

  }

  savePreMoves() {

    this.main.moveService.ConnectPreMoves(new ConnectMoves(this.currentMove.id, this.choosenMoves)).subscribe
      (
        data => {
          var tmp = data as boolean;
          if (tmp) {
            if (this.update) {
              this.main.moveService.GetMoveDetails(this.currentMove.id).subscribe
                (
                  data => {
                    this.currentMove = data as MoveDetails;
                    this.goSection(0);
                  }
                )
            }
            else {
              this.goSection(this.currentPage = this.currentPage + 1);
            }
          }
        }
      )
  }

  saveAlternation() {

    this.main.moveService.AddAlternations(new AddAlternation(this.currentMove.id, this.alternations)).subscribe
      (
        data => {
          var tmp = data as boolean;
          if (tmp) {
            if (this.update) {
              this.main.moveService.GetMoveDetails(this.currentMove.id).subscribe
                (
                  data => {
                    this.currentMove = data as MoveDetails;
                    this.goSection(0);
                  }
                )
            }
            else {
              this.goSection(this.currentPage = this.currentPage + 1);
            }
          }
        }
      )
  }

  savePostMoves() {

    this.main.moveService.ConnectPostMoves(new ConnectMoves(this.currentMove.id, this.choosenMoves)).subscribe
      (
        data => {
          var tmp = data as boolean;
          if (tmp) {
            if (this.update) {
              this.main.moveService.GetMoveDetails(this.currentMove.id).subscribe
                (
                  data => {
                    this.currentMove = data as MoveDetails;
                    this.goSection(0);
                  }
                )
            }
            else {
              this.goSection(this.currentPage = this.currentPage + 1);
            }
          }
        }
      )
  }

  saveTags() {

    this.main.moveService.AddTags(new AddTags(this.currentMove.id, this.choosenTags)).subscribe
      (
        data => {
          var tmp = data as boolean;
          if (tmp) {
            this.main.moveService.GetMoveDetails(this.currentMove.id).subscribe
              (
                data => {
                  this.currentMove = data as MoveDetails;
                  this.goSection(0);
                }
              )
          }
        }
      )
  }
}

