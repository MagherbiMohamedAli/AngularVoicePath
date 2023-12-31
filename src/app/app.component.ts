import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) { }
  title = 'azure-voice-recognition';
  recognizedText: string = '';
  x: string = '';


  startRecognition() {
    const speechConfig = sdk.SpeechConfig.fromSubscription('f8b231305ab9465fa950e75e6234f5fc', 'francecentral');
    speechConfig.speechRecognitionLanguage = 'fr-FR';
    const speechRecognizer = new sdk.SpeechRecognizer(speechConfig);
    let recognitionTimeout: any;

    speechRecognizer.recognizeOnceAsync(
      result => {
        this.recognizedText = result.text;
        const command = result.text;
        if (this.recognizedText == 'Salut.') {
          this.router.navigate(['/un']);
          console.log(this.recognizedText);
        } else if (this.recognizedText == 'Bonjour.') {
          this.router.navigate(['/deux']);
          console.log(this.recognizedText)
        } else {
          this.x = this.recognizedText + ", n'est pas une commande, vous pouvez dire 'AIDE' pour voir la liste des commandes";
        }
      },
      error => {
        console.log(`ERROR: ${error}`);
      }
    );
    recognitionTimeout = setTimeout(() => {
      if (speechRecognizer) {
        speechRecognizer.stopContinuousRecognitionAsync(
          () => {
            console.log('Speech recognition stopped');
          },
          error => {
            console.log(`ERROR: ${error}`);
          }
        );
      }
    }, 1500);


  }

}
