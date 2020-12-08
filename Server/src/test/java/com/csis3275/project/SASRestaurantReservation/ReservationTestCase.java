package com.csis3275.project.SASRestaurantReservation;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
public class ReservationTestCase {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @Before
  public void setUp() {
	  System.setProperty("webdriver.chrome.driver",
			  "C:/Users/Saran/Downloads/chromedriver_win32/chromedriver.exe");  
    driver = new ChromeDriver();
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }
  @After
  public void tearDown() {
    driver.quit();
  }
  @Test
  public void reservationTest() {
	  driver.get("http://localhost:4200/");
	    driver.manage().window().setSize(new Dimension(1936, 1056));
	    driver.findElement(By.linkText("Reservation")).click();
	    driver.findElement(By.id("mat-input-4")).click();
	    driver.findElement(By.id("mat-input-4")).sendKeys("saran");
	    driver.findElement(By.id("mat-input-5")).click();
	    driver.findElement(By.id("mat-input-5")).sendKeys("saran@gmail.com");
	    driver.findElement(By.id("mat-input-6")).click();
	    {
	      WebElement element = driver.findElement(By.cssSelector(".mat-datepicker-toggle-default-icon"));
	      Actions builder = new Actions(driver);
	      builder.moveToElement(element).perform();
	    }
	    driver.findElement(By.id("mat-input-6")).sendKeys("12345678");
	    driver.findElement(By.cssSelector(".mat-datepicker-toggle-default-icon")).click();
	    driver.findElement(By.cssSelector(".ng-star-inserted:nth-child(3) > .mat-calendar-body-cell:nth-child(4) > .mat-calendar-body-cell-content")).click();
	    driver.findElement(By.cssSelector(".ng-tns-c194-13:nth-child(2)")).click();
	    driver.findElement(By.cssSelector("#mat-option-4 > .mat-option-text")).click();
	    driver.findElement(By.cssSelector(".ng-tns-c194-15:nth-child(2)")).click();
	    driver.findElement(By.cssSelector("#mat-option-9 > .mat-option-text")).click();
	    driver.findElement(By.cssSelector(".mat-raised-button")).click();
  }
}

