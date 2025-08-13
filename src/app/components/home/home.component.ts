import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from 'src/app/components/home/welcome/welcome.component';
import { FeatureCardComponent } from 'src/app/components/home/feature-card/feature-card.component';
import { FeatureSectionComponent } from 'src/app/components/home/feature-section/feature-section.component';
import { CtaSectionComponent } from "./cta-section/cta-section.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, WelcomeComponent, FeatureSectionComponent, CtaSectionComponent],
  templateUrl: './home.component.html',

})
export class HomePageComponent {

}
