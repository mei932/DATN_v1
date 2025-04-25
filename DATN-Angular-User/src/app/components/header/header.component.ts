import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit, DoCheck {
  @Input() isLogin!: boolean;
  @Input() avatar!: string;
  cartCount: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.updateCartCount();  // Cập nhật số lượng giỏ hàng khi khởi tạo
  }

  ngDoCheck() {
    this.updateCartCount();  // Kiểm tra lại giỏ hàng khi có thay đổi
  }

  updateCartCount() {
    const cart = JSON.parse(sessionStorage.getItem('samanhua-shop-cart') || '[]');
    this.cartCount = cart.reduce((total: number, item: any) => total + item.quantity, 0);
  }

  onLogOut() {
    localStorage.removeItem('samanhua-shop-user-token');
    localStorage.removeItem('samanhua-shop-current-user');
    sessionStorage.removeItem('samanhua-shop-cart');
    this.isLogin = false;
    this.avatar = '';
    this.router.navigate(['/']);
  }
}
