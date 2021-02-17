import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Sequence } from '../model/sequence';
import { Dance } from '../model/dance';
import { Move } from '../model/move';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AddSequence } from '../model/addSequence';

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.css']
})
export class SequenceComponent {

  public sequences: Sequence[] | null;
  public currentSequence: Sequence | null;
  public addSeqeunce: boolean | null;
  public availableMoves: Move[];
  public currentMoves: Move[];
  public activateSumbit: boolean;
  public currentDanceId: number = 0;
  public dances: Dance [] | null;

  sequenceForm: FormGroup;
  submitted: boolean = false;

  constructor(public main: AppComponent, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.currentMoves = [];
    console.log("Sequence.Components.Constructor");
    this.main.userService.GetSequence(this.main.currentUser.id).subscribe(

      data => {
        console.log(data);
        this.sequences = data as Sequence[];
      }
    )
    this.sequenceForm = this.formBuilder.group({
      sequenceName: ['', [Validators.required, Validators.minLength(3)]],
    });

    console.log("Get all moves for dances");
    this.main.moveService.GetDances().subscribe(

      data => {
        console.log(data);
        this.dances = data as Dance[];
        this.dances.unshift(new Dance(0,"*Wybierz"))
      }
    )

    this.main.moveService.GetMoves(1).subscribe(
      data => {

        console.log(data);
        this.availableMoves = data as Move[];
        this.availableMoves.unshift(new Move(0, "Wybierz*", ""));
      });
  }

  changeDance(danceId:number)
  {
    if(danceId == 0)
    return;
    this.currentDanceId = danceId;
    this.main.moveService.GetMoves(danceId).subscribe(
      data => {

        console.log(data);
        this.availableMoves = data as Move[];
        this.availableMoves.unshift(new Move(0, "Wybierz*", ""));
      });
  }

  selectSequence(sequence: Sequence) {
    this.currentSequence = sequence;
  }

  activateAddSequence() {
    console.log("activateAddSequence");
    this.addSeqeunce = true;
    console.log("Get all moves for dances");
    this.main.moveService.GetMoves(this.currentDanceId).subscribe(
      data => {

        console.log(data);
        this.availableMoves = data as Move[];
        this.availableMoves.unshift(new Move(0, "Wybierz*", ""));
      });
  }

  addMove(moveId: number) {
    console.log("addMove");
    let move: Move;
    this.main.moveService.GetMove(moveId).subscribe(
      data => {
        move = data as Move;
        console.log("Move:" + move);
        this.currentMoves.push(move);
      }
    );
    console.log("Move2:" + move);

    this.main.moveService.GetPostMove(moveId).subscribe(
      data => {
        this.availableMoves = data as Move[];
        this.availableMoves.unshift(new Move(0, "Wybierz*", ""));
      }
    );
    console.log(this.currentMoves);
    console.log(this.availableMoves);
  }

  cancel() {
    console.log("cancel");
    this.addSeqeunce = false;
    this.currentMoves = [];
  }

  delete(id: number) {
    this.main.userService.DeleteSequence(id).subscribe(
      data => {
        if (data as boolean) {
          this.main.userService.GetSequence(this.main.currentUser.id).subscribe(
            data => {
              console.log(data);
              this.sequences = data as Sequence[];
            }
          );
        }
      }
    );
  }

  deleteLast() {
    console.log("deleteLast");
    this.currentMoves.splice(this.currentMoves.length - 1);
    console.log("remove item from array");
    if (this.currentMoves.length == 0) {
      console.log("Get all moves for dances");
      this.main.moveService.GetMoves(this.currentDanceId).subscribe(
        data => {

          console.log(data);
          this.availableMoves = data as Move[];
          this.availableMoves.unshift(new Move(0, "Wybierz*", ""));
        });
    }
    else {
      console.log("Get all post moves for move");
      this.main.moveService.GetPostMove(this.currentMoves[this.currentMoves.length - 1].id).subscribe(
        data => {
          console.log(data);
          this.availableMoves = data as Move[];
          this.availableMoves.unshift(new Move(0, "Wybierz*", ""));
        });
    }
  }

  callActivateSumbit() {
    console.log("callActivateSumbit");
    this.activateSumbit = true;
  }

  onSubmit() {
    console.log("SUBMIT");
    if (this.currentMoves.length > 0 && this.activateSumbit) {
      this.activateSumbit = false;
      let addSeqeunceModel = new AddSequence(this.sequenceForm.controls.sequenceName.value, this.currentMoves, this.main.currentUser.id);
      console.log(addSeqeunceModel);
      this.main.userService.AddSequence(addSeqeunceModel).subscribe(
        data => {
          let temp = data as boolean;
          console.log("operation succes:" + (temp));
          if (temp) {
            this.addSeqeunce = false;
            this.currentMoves = [];
            this.main.userService.GetSequence(this.main.currentUser.id).subscribe(

              data => {
                console.log(data);
                this.sequences = data as Sequence[];
              }
            )
          }
        }
      )
    }
  }
}

