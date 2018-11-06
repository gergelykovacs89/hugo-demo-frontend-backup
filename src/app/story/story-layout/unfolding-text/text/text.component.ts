import { Component, OnInit } from '@angular/core';
import {TextModel} from '../../../../shared/models/text.model';
import {TextService} from '../../../text.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  private text: TextModel;
  constructor(private textService: TextService) { }

  ngOnInit() {
    this.text = this.textService.getRootText(1);
  }

}
