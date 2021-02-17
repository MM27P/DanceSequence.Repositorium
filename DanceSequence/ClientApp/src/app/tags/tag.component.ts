import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Tag } from '../model/tag';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent {

  public tags: Tag[] = [];
  public currentTag: Tag | null;
  public addTag: boolean = false;
  public updateTag: boolean = false;
  public activeSubmit: boolean;
  tagForm: FormGroup;
  submitted: boolean = false;
  constructor(public main: AppComponent, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.tagForm = this.formBuilder.group({
      tagValue: ['', [Validators.required, Validators.minLength(3)]],
      tagDescription: ['', [Validators.required, Validators.minLength(3)]]
    });
    console.log("Tag.Components.Constructor");
    this.main.tagService.GetTags().subscribe(
      data => {
        this.tags = data as Tag[];
      }
    )
  }

  tagSelected(tag: Tag) {
    console.log("tagSelected");
    this.updateTag = true;
    this.addTag = false;
    this.currentTag = tag;
    this.tagForm.setValue(
      {
        tagValue: tag.value,
        tagDescription: tag.description
      }
    )
  }

  deleteTag(id: number) {
    this.currentTag = null;
    console.log("DELETE");
    this.main.tagService.DeleteTag(id).subscribe(
      temp => {
        this.main.tagService.GetTags().subscribe(
          data => {
            console.log("laod");
            if (temp) {
              this.tags = data as Tag[];
            }
          })
      }
    );
  }

  show() {
    this.addTag = true;
    this.updateTag = false;
    console.log("show");
  }

  get formControls() {
    return this.tagForm.controls;
  }

  callActivateSubmit() {
    console.log("activate");
    this.activeSubmit = true;
  }

  cancel() {
    this.addTag = false;
    this.updateTag = false;
  }

  onSubmit() {
    console.log("onSubmit");
    this.submitted = true;
    // Sprawdzenie poprawności danych w formularzu
    if (this.tagForm.invalid) {
      return;
    }

    if (!this.activeSubmit) {
      return;
    }

    if (this.addTag) {
      console.log("Add tag");
      console.log(this.tagForm.controls.tagValue.value);
      console.log(this.tagForm.controls.tagDescription.value);
      this.main.tagService.AddTag(new Tag(0, this.tagForm.controls.tagValue.value, this.tagForm.controls.tagDescription.value)).subscribe(
        data => {
          this.addTag = false;
          this.main.tagService.GetTags().subscribe(
            data => {
              this.tags = data as Tag[];
            }
          )
        }
      )
    }
    else if (this.updateTag) {
      console.log("Update tag");
      console.log(this.currentTag.id);
      console.log(this.tagForm.controls.tagValue.value);
      console.log(this.tagForm.controls.tagDescription.value);
      this.main.tagService.UpdateTag(new Tag(this.currentTag.id, this.tagForm.controls.tagValue.value, this.tagForm.controls.tagDescription.value)).subscribe(
        data => {
          this.updateTag = false;
          this.main.tagService.GetTags().subscribe(
            data => {
              this.tags = data as Tag[];
            }
          )
        })
    }
  }
}

