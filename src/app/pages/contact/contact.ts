import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage';
import { ContactoForm } from '../../interfaces/contacto.interface';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent implements OnInit {

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  contactForm!: FormGroup;
  showMultimedia: boolean = false;
  isSubmitting: boolean = false;
  submitSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSavedData();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: [''],
      aceptaCondiciones: [false, Validators.requiredTrue]
    });

    this.contactForm.valueChanges.subscribe(value => {
      this.autoSaveForm(value);
    });
  }

  private loadSavedData(): void {
    try {
      const saved = this.storageService.getItem<ContactoForm>('contactForm');
      if (saved) {
        this.contactForm.patchValue(saved);
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }

  private autoSaveForm(value: any): void {
    try {
      this.storageService.setItem('contactForm', value);
    } catch (error) {
      console.error('Error al auto-guardar:', error);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    setTimeout(() => {
      console.log('Formulario enviado:', this.contactForm.value);
      this.saveContactRecord();

      this.submitSuccess = true;
      this.isSubmitting = false;

      setTimeout(() => {
        this.resetForm();
        this.submitSuccess = false;
      }, 3000);
    }, 1500);
  }

  private saveContactRecord(): void {
    try {
      const contacts = this.storageService.getItem<ContactoForm[]>('contactRecords') || [];
      contacts.push({
        ...this.contactForm.value,
        fecha: new Date()
      });
      this.storageService.setItem('contactRecords', contacts);
    } catch (error) {
      console.error('Error al guardar registro:', error);
    }
  }

  resetForm(): void {
    this.contactForm.reset({ aceptaCondiciones: false });
    this.storageService.removeItem('contactForm');
  }

  toggleMultimedia(): void {
    this.showMultimedia = !this.showMultimedia;
  }

  playVideo(): void {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.play();
    }
  }
}
