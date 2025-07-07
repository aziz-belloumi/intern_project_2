import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from 'src/app/components/home-components/welcome/welcome.component';
import { FeatureCardComponent } from 'src/app/components/home-components/feature-card/feature-card.component';
import { FeatureSectionComponent } from 'src/app/components/home-components/feature-section/feature-section.component';
import { CtaSectionComponent } from "../../components/home-components/cta-section/cta-section.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, WelcomeComponent, FeatureSectionComponent, CtaSectionComponent],
  templateUrl: './home.component.html',

})
export class HomePageComponent {

}
