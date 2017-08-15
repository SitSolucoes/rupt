import { CurrencyFormatPipe } from './shared/currency-format-pipe.pipe';
import { PagamentoService } from './services/pagamento.service';
import { UploadFileService } from './services/upload-file.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminModule } from './admin/admin.module';
import { RuptRoutingModule } from './rupt.routing.module';
import { MaterializeModule } from 'angular2-materialize';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputMaskModule } from 'ng2-inputmask';
import { InternetModule } from "app/internet/internet.module";


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AdminModule,
    InternetModule,
    RuptRoutingModule,
    MaterializeModule,
    BrowserAnimationsModule,
    InputMaskModule,
    
  ],
  providers: [
    AuthGuard,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    UploadFileService,
    PagamentoService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
