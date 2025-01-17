import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { PostCreateComponent } from './posts/post-create/post-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
// import { HeaderComponent } from './header/header.component';
// import { PostListComponent } from './posts/post-list/post-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
// import { LoginComponent } from './login/login.component';
// import { SignupComponent } from './signup/signup.component';
// import { AuthInterceptor } from './auth/auth-interceptor';
// import { ErrorComponent } from './error/error.component';
// import { ErrorInterceptor } from './error/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    // PostCreateComponent,
    // HeaderComponent,
    // PostListComponent,
    // LoginComponent,
    // SignupComponent,
    // ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatPaginatorModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideClientHydration(), provideAnimationsAsync(), 
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  // entryComponents: [ErrorComponent],
})
export class AppModule {}
