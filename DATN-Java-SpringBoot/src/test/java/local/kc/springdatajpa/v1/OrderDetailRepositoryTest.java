package local.kc.springdatajpa.v1;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import local.kc.springdatajpa.models.OrderDetail;
import local.kc.springdatajpa.repositories.v1.OrderDetailRepository;
import java.util.Set;

@SpringBootTest

public class OrderDetailRepositoryTest {
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    // tính tổng doanh thu (revenue) từ các đơn hàng của customer có ID = 3.
    @Test
    public void getRevenuesOfCustomerById() {
        long revenuesOfCustomerById = orderDetailRepository.getRevenuesOfCustomerById(1);
        System.out.println(revenuesOfCustomerById);
    }

    // Lấy danh sách chi tiết đơn hàng của order_id = 25 và in thêm Option tương ứng
    @Test
    public void findByOrderId() {
        Set<OrderDetail> orderDetails = orderDetailRepository.findByOrderId(25);
        orderDetails.forEach(orderDetail -> {
            System.out.println(orderDetail);
            System.out.println(orderDetail.getOption());
        });
    }
}
