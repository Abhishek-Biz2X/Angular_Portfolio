import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, Renderer2, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = "Portfolio-Website";
  navLinks!: NodeListOf<HTMLElement>;
  isNavbarActive = false;
  isModalOpen = false;
  selectedProject: any;
  isDialogOpen = false;

  //Project data
  projects = [
    {
      title: 'Angular Portfolio Website',
      description: 'A portfolio website built using Angular.',
      details: 'This project showcases my skills in Angular, TypeScript, CSS and HTML5.',
      image: 'images/AngularPortfolio.png',
    },
    {
      title: 'Online E-Shopper Website',
      description: 'An e-commerce platform built with React.',
      details: 'This project showcase my ability in MERN-Stack alongwith Restful-APIs.',
      image: 'images/onlineEShopper.jpg',
    },
    {
      title: 'Sentence Emotion Analyzer',
      description: 'A Python-based application for analyzing emotions in sentences.',
      details: 'This project showcase my knowledge in the field of ML, DL and NLP. I used BERT model in this project.',
      image: 'images/SentenceEmotion.jpg',
    },
    {
      title: 'Online Banking Management Website',
      description: 'A full-stack banking application built with Flask.',
      details: 'This project showcase my ability in Python, Django, flask and MySQL.',
      image: 'images/onlineBanking.jpg',
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.navLinks = document.querySelectorAll('header nav a');
      this.addMenuIconClickListener();
      this.addClickEventListeners();
      this.addFooterIconClickListener();
      (window as any).initializeAnimations();
    }
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  addClickEventListeners() {
    this.navLinks.forEach(link => {
      this.renderer.listen(link, 'click', (event) => {
        this.setActiveLink(event);
        if (window.innerWidth <= 760) {
          this.closeNavbar();
        }
      });
    });

    // Add event listener for project "Know more" buttons
    const knowMoreButtons = document.querySelectorAll('.project-box .btn');
    knowMoreButtons.forEach((button, index) => {
      this.renderer.listen(button, 'click', () => this.openModal(this.projects[index]));
    });
  }

  //Modal functions
  openModal(project: any) {
    this.selectedProject = project;
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
    this.selectedProject = null;
  }

  showDialog(event: Event) {
    event.preventDefault();
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  addFooterIconClickListener() {
    const footerIcon = document.querySelector('.footer-iconTop a') as HTMLElement;
    if (footerIcon) {
      this.renderer.listen(footerIcon, 'click', (event) => {
        event.preventDefault();
        this.setActiveLinkToHome();
        if (window.innerWidth <= 760) {
          this.closeNavbar();
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  addMenuIconClickListener() {
    const menuIcon = document.querySelector('#menu-icon') as HTMLElement;
    const navbar = document.querySelector('.navbar') as HTMLElement;

    if (menuIcon && navbar) {
      this.renderer.listen(menuIcon, 'click', () => {
        this.isNavbarActive = !this.isNavbarActive;
        this.updateNavbarState(navbar, menuIcon);
      });
    }
  }

  updateNavbarState(navbar: HTMLElement, menuIcon: HTMLElement) {
    this.toggleNavbar(navbar, this.isNavbarActive);
    this.toggleMenuIcon(menuIcon, this.isNavbarActive);
  }

  toggleNavbar(navbar: HTMLElement, isActive: boolean) {
    this.renderer.setStyle(navbar, 'display', isActive ? 'flex' : 'none');
    if (isActive) {
      this.renderer.addClass(navbar, 'active');
    } else {
      this.renderer.removeClass(navbar, 'active');
    }
  }

  toggleMenuIcon(menuIcon: HTMLElement, isActive: boolean) {
    if (isActive) {
      this.renderer.removeClass(menuIcon, 'bxs-menu');
      this.renderer.addClass(menuIcon, 'bxs-x-square');
    } else {
      this.renderer.addClass(menuIcon, 'bxs-menu');
      this.renderer.removeClass(menuIcon, 'bxs-x-square');
    }
  }

  setActiveLink(event: Event) {
    this.navLinks.forEach(link => {
      this.renderer.removeClass(link, 'active');
    });

    const target = event.target as HTMLElement;
    if (target) {
      this.renderer.addClass(target, 'active');
    }
  }

  setActiveLinkToHome() {
    this.navLinks.forEach(link => {
      this.renderer.removeClass(link, 'active');
    });

    const homeLink = document.querySelector('header nav a[href="#home"]') as HTMLElement;
    if (homeLink) {
      this.renderer.addClass(homeLink, 'active');
    }
  }

  closeNavbar() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (navbar) {
      this.isNavbarActive = false;
      this.toggleNavbar(navbar, false);
      this.resetMenuIcon();
    }
  }

  resetMenuIcon() {
    const menuIcon = document.querySelector('#menu-icon') as HTMLElement;
    if (menuIcon) {
      this.renderer.removeClass(menuIcon, 'bxs-x-square');
      this.renderer.addClass(menuIcon, 'bxs-menu');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 760) {
      this.isNavbarActive = true;
      const navbar = document.querySelector('.navbar') as HTMLElement;
      if (navbar) {
        this.toggleNavbar(navbar, true);
      }
    } else if (window.innerWidth <= 760 && this.isNavbarActive) {
      this.closeNavbar();
    }
  }
}
