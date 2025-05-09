import { Component, OnInit } from '@angular/core';
import { DatePipe, NgClass, NgForOf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { OrderDetailService } from "../../../services/order-detail.service";
import { VNDCurrencyPipe } from "../../../pipes/vnd-currency.pipe";
import { OrderService } from "../../../services/order.service";
import { switchMap } from "rxjs";
import { ToastService } from "../../../services/toast.service";

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [DatePipe, FormsModule, NgForOf, RouterLink, NgClass, VNDCurrencyPipe],
  templateUrl: './order-details.component.html',
  styles: ``
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: any[] = [];
  orderId!: number;
  count: number = 0;
  order!: any;
  totalPrice: number = 0;
  protected readonly Math = Math;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(params => {
          this.orderId = +params['id'];
          return this.orderService.getOrderById(this.orderId);
        }),
        switchMap(order => {
          this.order = order;
          return this.orderDetailService.getOrderDetailsByOrder(this.orderId);
        }),
        switchMap(orderDetails => {
          this.orderDetails = orderDetails;
          this.totalPrice = orderDetails.reduce((sum, detail) => sum + detail.price, 0);
          return this.orderDetailService.getOrderDetailsCountByOrder(this.orderId);
        })
      )
      .subscribe(count => {
        this.count = count;
      });
  }

  onChangeOrderStatus(id: number, status: number): void {
    this.orderService.updateOrderStatus(id, status).subscribe(() => {
      this.toastService.makeOrderToast(id, status);
      this.refreshOrder();
    });
  }

  private refreshOrder(): void {
    this.orderService.getOrderById(this.orderId).subscribe(order => {
      this.order = order;
    });
  }
  onDownloadInvoice(): void {
    const element = document.getElementById('invoice-section');
    if (!element) {
      console.error('Không tìm thấy phần tử invoice-section để tải.');
      return;
    }
  
    const content = element.innerHTML;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = `hoa-don-${this.orderId}.html`;
    link.click();
  
    URL.revokeObjectURL(url);
  }
  
}
