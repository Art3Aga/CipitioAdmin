import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UsuarioGuard } from './usuario-guard.guard';

describe('UsuarioGuardGuard', () => {
  let guard: UsuarioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ]
    });
    guard = TestBed.inject(UsuarioGuard);
  });

  /*it('should be created', () => {
    expect(guard).toBeTruthy();
  });*/

  test('validar si existe usuario logueado', () => {
    expect(guard.canActivate).toBeTruthy();
  });
});
