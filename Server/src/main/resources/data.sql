INSERT INTO roles(name) VALUES('customer');
INSERT INTO roles(name) VALUES('employee');
INSERT INTO roles(name) VALUES('admin');

INSERT INTO MENU_ITEMS VALUES ('1','Main Course','Sample description of item','Item 1','8.99');
INSERT INTO MENU_ITEMS VALUES ('2','Main Course','Sample description of item','Item 2','8.99');
INSERT INTO MENU_ITEMS VALUES ('3','Main Course','Sample description of item','Item 3','8.99');
INSERT INTO MENU_ITEMS VALUES ('4','Main Course','Sample description of item','Item 4','8.99');
INSERT INTO MENU_ITEMS VALUES ('5','Main Course','Sample description of item','Item 5','8.99');
INSERT INTO MENU_ITEMS VALUES ('6','Main Course','Sample description of item','Item 6','8.99');
INSERT INTO MENU_ITEMS VALUES ('7','Main Course','Sample description of item','Item 7','8.99');
INSERT INTO MENU_ITEMS VALUES ('8','Main Course','Sample description of item','Item 8','8.99');
INSERT INTO MENU_ITEMS VALUES ('9','Main Course','Sample description of item','Item 9','8.99');
INSERT INTO MENU_ITEMS VALUES ('10','Main Course','Sample description of item','Item 10','8.99');
INSERT INTO MENU_ITEMS VALUES ('11','Main Course','Sample description of item','Item 11','8.99');
INSERT INTO MENU_ITEMS VALUES ('12','Main Course','Sample description of item','Item 1','8.99');

insert into Seat (seat_id, capacity, clean_status,  xposition, yposition) values (1, 3, 'dirty', 0, 0);
insert into Seat (seat_id, capacity, clean_status,  xposition, yposition) values (2, 4, 'clean', 0 , 100);
insert into Seat (seat_id, capacity, clean_status, xposition, yposition) values (3, 3, 'dirty',  0, 200);
insert into Seat (seat_id, capacity, clean_status,  xposition, yposition) values (4, 6, 'occupied',  0, 300);
insert into Seat (seat_id, capacity, clean_status,  xposition, yposition) values (5, 6, 'clean',  0, 400);
insert into Seat (seat_id, capacity, clean_status,  xposition, yposition) values (6, 1, 'dirty',  200,0 );
insert into Seat (seat_id, capacity, clean_status,  xposition, yposition) values (7, 3, 'dirty',  200, 100);
insert into Seat (seat_id, capacity, clean_status,  xposition, yposition) values (8, 5, 'clean',  200, 200);
insert into Seat (seat_id, capacity, clean_status,  xposition, yposition) values (9, 5, 'dirty',  300, 0);
insert into Seat (seat_id, capacity, clean_status,  xposition, yposition) values (10, 3, 'clean',  400, 0);
insert into Seat (seat_id, capacity, clean_status,  xposition, yposition) values (11, 6, 'occupied',  400, 100);
insert into Seat (seat_id, capacity, clean_status,  xposition, yposition) values (12, 3, 'occupied',  500, 100);
insert into Seat (seat_id, capacity, clean_status,  xposition, yposition) values (13, 3, 'occupied',  600, 100);
insert into Seat (seat_id, capacity, clean_status,  xposition, yposition) values (14, 2, 'occupied',  600, 200);
insert into Seat (seat_id, capacity, clean_status,  xposition, yposition) values (15, 5, 'clean',  600, 300);

insert into Orders(order_id, order_status, is_payed, subtotal, total, seat_id) values(202, 'TRUE', 'FALSE', 404, 450, 3);
insert into Orders(order_id, order_status, is_payed, subtotal, total, seat_id) values(203, 'FALSE', 'TRUE', 420, 435, 3);
insert into Orders(order_id, order_status, is_payed, subtotal, total, seat_id) values(204, 'FALSE', 'TRUE', 69, 75, 3);
insert into Orders(order_id, order_status, is_payed, subtotal, total, seat_id) values(205, 'FALSE', 'TRUE', 666, 777, 3);


insert into Order_Item(order_item_id, quantity, subtotal, item_id ) values(2021, 3, 67, 2);
insert into Order_Item(order_item_id, quantity, subtotal, item_id ) values(2022, 8, 109, 3);
insert into Order_Item(order_item_id, quantity, subtotal, item_id ) values(2023, 2, 20, 4);
insert into Order_Item(order_item_id, quantity, subtotal, item_id ) values(2024, 1, 30, 5);
insert into Order_Item(order_item_id, quantity, subtotal, item_id ) values(2025, 5, 47, 6);

