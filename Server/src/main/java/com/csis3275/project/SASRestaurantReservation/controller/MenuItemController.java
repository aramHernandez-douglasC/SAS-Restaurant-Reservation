package com.csis3275.project.SASRestaurantReservation.controller;

import static java.lang.System.out;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.csis3275.project.SASRestaurantReservation.model.MenuItem;
import com.csis3275.project.SASRestaurantReservation.repository.MenuItemRepository;

@CrossOrigin(origins = "http://localhost:4200")

@RestController
public class MenuItemController {
	@Autowired
	private MenuItemRepository repository;
	@Autowired
	private MenuItem menuItem;

	/**
	 * @author Saran
	 * This class will hold items for the Menu and their prices. Users with Administrator privileges
	 * can edit or delete items.
	 **/
	
	
	/**Get Mapping to retrieve all menu items.
	 */
	
	@GetMapping(value = "/items")
	public Iterable<MenuItem> getAllMenuItems() {
		return repository.findAll();
	}
	
//	/**Post Mapping to save or update menu items.
//	 */
//	@PostMapping(value = "/items/new", produces = MediaType.APPLICATION_JSON_VALUE)
//	public ResponseEntity<MenuItem> saveMenuItem(@RequestBody MenuItem mItem) throws Throwable {
//		try {
//			if (repository.findById(mItem.getId()) == null) {
//				this.menuItem = repository.save(menuItem);
//				System.out.println("New Item inserted!");
//				return new ResponseEntity<MenuItem>(this.menuItem, HttpStatus.ACCEPTED);
//			}
//
//		} catch (Exception e) {
//			throw new Exception(e);
//		}
//		return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
//	}
	
	/**Post Mapping to delete menu item.
	 */
	@PostMapping(value = "/items/delete/{itemId}")
	public void deleteMenuItem(@PathVariable("itemId") int itemId) throws Throwable {
		try {
			if (repository.findById(itemId) != null) {
				repository.deleteById(itemId);
				System.out.print("Item Deleted successfully");
			}
		} catch (Exception e) {
			throw new Exception(e);
		}

	}
	
	@PutMapping(value = "/update-item",  produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MenuItem> updateMenu (@RequestBody MenuItem item) throws Throwable{
		try {			
			if (item != null) {
				this.menuItem = item;
				repository.save(this.menuItem);
				System.out.println("Menu Updated!");
				System.out.print("Menu updated successfully: " + this.menuItem.getId());
				return new ResponseEntity<MenuItem>(this.menuItem, HttpStatus.OK);
			}
		}
		catch(Exception e) {
			throw new Exception(e);
		}
		return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
	}
	

}
