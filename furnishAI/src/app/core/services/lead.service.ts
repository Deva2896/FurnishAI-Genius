import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Lead, LeadRequest } from '../models/lead.model';

let nextId = 1;

/**
 * Handles "Contact Store" enquiries. `submitEnquiry()` currently resolves
 * locally; wire it to `addDoc(collection(firestore, 'leads'), ...)` once
 * Firestore is provisioned — the `Lead` shape already mirrors the planned
 * document schema.
 */
@Injectable({ providedIn: 'root' })
export class LeadService {
  submitEnquiry(request: LeadRequest): Observable<Lead> {
    const lead: Lead = {
      ...request,
      id: `lead-${nextId++}`,
      createdDate: new Date().toISOString(),
      status: 'new'
    };
    return of(lead).pipe(delay(400));
  }
}
