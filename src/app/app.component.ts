import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppSettingsService } from './common/services/app-settings/app-settings.service';
import { SpeedInsightsService } from './common/services/speed-insights/speed-insights.service';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExperienceDurationPipe } from './common/pipes/app-experienceDuration/experience-duration.pipe';
import { Maintenance } from './common/templates/maintenance';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Maintenance, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'myPortfolio';
  insightsData: any;
  errorMessage: string | null = null;

  private testUrl = 'https://rabinr.com/';

  constructor(public appSetting: AppSettingsService,
    private speedInsightsService: SpeedInsightsService,
    private renderer: Renderer2) {
  }

  ngOnInit(): void {
    // this.getInsights();
    // this.addJsonLd();
  }

  addJsonLd() {
    const jsonLd = {
      "@context": "http://schema.org",
      "@type": "Person",
      "name": "Rabin R",
      "url": "https://rabinr.com",
      "image": "https://rabinr.com/image/png/favicon.png",
      "sameAs": [
        "https://www.linkedin.com/in/rabin-r-0a2407228",
        "https://github.com/Rabinramarajan",
        "https://x.com/BigilRabinrs?t=fpSZYa76XrrYaZbLfCXgCA&s=09"
      ],
      "jobTitle": "Front-End Developer",
      "alumniOf": "National College, Tiruchirapalli",
      "worksFor": {
        "@type": "Organization",
        "name": "ITGalax Solution Pvt Ltd"
      }
    };

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    this.renderer.appendChild(document.head, script);
  }


  getInsights() {
    this.speedInsightsService.fetchPageSpeedInsights(this.testUrl).subscribe({
      next: (data) => {
        this.insightsData = data;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching PageSpeed data: ' + err.message;
      },
    });
  }
}
