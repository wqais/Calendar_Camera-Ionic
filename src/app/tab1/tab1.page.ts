import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  Camera,
  CameraSource,
  CameraResultType,
} from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone : true ,
  imports : [IonicModule,CommonModule]
})
export class Tab1Page {
  constructor(private domSanitizer: DomSanitizer) {}

  photoTaken: (string | undefined)[] = [];
  imageSource: SafeResourceUrl | null = null;

  async openGallery() {
    const image= await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    console.log(image);
    this.photoTaken.push(image?.webPath);
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
    });
    this.imageSource = this.domSanitizer.bypassSecurityTrustResourceUrl(
      image.webPath ? image.webPath : ''
    );
    this.photoTaken.push(image?.webPath);
    console.log(this.photoTaken);
    
  }

  getPhoto() {
    return this.imageSource;
  }
}
