# playwright-ts-sportsbet

## Overview: 

This framework is designed using playwright test automation tool with typescript. 
It uses page object model + fixture capability in playwright. 
Currently there is only one type of test which is placing the bets in first available racecard and assert in betSlip

### Steps to run test:

- Install all the required dependencies
    
        npm i

- Run test and generate Allure Report

        npm test

-  Run test in headed mode and genarte Allure Report 

        npm run test:headed
        
#### Additional Information

- Reporter Name - Allure report
- Screenshots will be captured and attached to the report for each test


### Assumptions 

 - Browser Height is assumed to be 720 pixel
 - Place bets function is written for placing multiple bets which generate random unique bets from the available bets option. 
 - If race outcome is suspended or race already started then the test is navigating back to home page and trying next card to place the bets.
 - There are extra tests to place multiple bets which is not given in the instructions but just added to run them parallelly. 
 - Only chromium browser is enabled in playwright config

 ### Improvement Areas

 - Framework can be modified to run in different viewports (package.json script to run with mobile view or desktop view)
 - While placing the bests if race has already started then there could be some cases which needs to handle like live betting etc
 - Loggers can be added for more debugging
 - global set up and teardown can be implemented
 - Running test in different test enviornments can be implemented
 - We can configure all the pages urls and assert them as we navigate through the pages.
 - As framework grows, we can add small utils and methods to handle scenarios in placeBets.

### Problems encountered and possible solution approach
 - Element locators are dynamic in nature for responsive browser dimention e.g. for width 420 pixel, we can make it more robust by controller class which detects browser size and use element locators accordingly.

 - As we don't know what horse races are happening on which we are going to place bets so it is cureently handled at the runtime and make it more suitable as per the requirements. 
