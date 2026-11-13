// Import the Node.js file system module so the JSON file can be read from disk.
//import fs from 'fs';
// Import the path helper so the app can build a correct file path to the data folder.
//import path from 'path';
// fs and path are not used in this project week 12
// npm install got@9.6.0 was downloaded to use instead of fs and path
// got will be used to retrive json

import got from 'got';




// Set the folder where the JSON blog data lives inside the project.
//const dataDir = path.join(process.cwd(), 'data');
//path will not be needed because its not a loal json file
const dataURL = "https://dev-de-carlo-cs-5513-week-11.pantheonsite.io//wp-json/twentytwentyone-child/v1/latest-posts/1";




// Export a function that reads the whole JSON file and returns a sorted list of blog entries.
export async function getSortedPostsData() {
    // Build the exact path to the posts.json file in the project data folder.
    //  const filePath = path.join(dataDir, 'posts.json');
    // Read the JSON file as a string so it can be parsed into JavaScript objects.
     // this is not needed for retriving online json this is for local only:  const jsonString = fs.readFileSync(filePath, 'utf8');

    // this uses got to retrive the url for json parsing
    let jsonString;
    try {
        // next line uses got synchronously to retrive via https the json from wp site
        jsonString = await got(dataURL);
        console.log(jsonString.body);

    } catch (error) {
        jsonString.body = [];
        console.log(error);

    }

    // Convert the text file into a JavaScript array of post objects.
    // this is for the local json file: const jsonObj = JSON.parse(jsonString);
    const jsonObj = JSON.parse(jsonString.body); // this was revised for got import

    // Sort the posts alphabetically by title so the list appears in a predictable order.
   // jsonObj.sort(function (a, b) {
   //     return a.title.localeCompare(b.title);
   // });

    // Return a simplified array that only includes the fields needed by the homepage.
    return jsonObj.map(item => {
        return {
            // Convert the numeric post id into a string so it works naturally in route URLs.
            id: item.ID.toString(), // id was changed to ID due to case sensitivity of the JSON ID value
            // Keep the post title for display in the list.
            title: item.post_title,
            // Keep the published date for display and sorting.
            date: item.post_date,
            // Keep the gift idea data if the project uses it elsewhere.
            //giftideas: item.giftIdea
            link1: item.guid,
        };
    });
}

// Export a function that creates the static paths required for each blog post page.
export async function getAllPostIds() {
    // Build the full path to the JSON file again.
    // const filePath = path.join(dataDir, 'posts.json');
    // Read the JSON file from disk.
   // const jsonString = fs.readFileSync(filePath, 'utf8');


    let jsonString;
    try {
        // next line uses got synchronously to retrive via https the json from wp site
        jsonString = await got(dataURL);
        console.log(jsonString.body);

    } catch (error) {
        jsonString.body = [];
        console.log(error);

    }


    // Parse the text into the JavaScript object structure.
   //const jsonObj = JSON.parse(jsonString);

   const jsonObj = JSON.parse(jsonString.body);

    //double check this in case of pre=mature end
    jsonObj.sort(function (a, b) {
        return a.post_title.localeCompare(b.name);
    })


    // Log the data to the console during development so the values can be inspected.
    console.log(jsonObj);
    // Map each object into a Next.js params object for static generation.
    return jsonObj.map(item => {
        return {
            params: {
                // Convert the numeric id into a string to match the URL parameter format.
                id: item.ID.toString(),
            }
        };
    });
}

// Export a function that fetches the data for a single post by matching the requested id.
export async function getPostData(id) {
    // Locate the JSON file again.
    //const filePath = path.join(dataDir, 'posts.json');
    // Read the JSON content from disk.
    //const jsonString = fs.readFileSync(filePath, 'utf8');
    
    let jsonString;
    try {
        // next line uses got synchronously to retrive via https the json from wp site
        jsonString = await got(dataURL);
        console.log(jsonString.body);

    } catch (error) {
        jsonString.body = [];
        console.log(error);

    }
    
    // Parse the file into a JavaScript array.
    //const jsonObj = JSON.parse(jsonString);
    const jsonObj = JSON.parse(jsonString.body);



    // Filter the array down to the matching post whose id equals the requested id.
    const objReturned = jsonObj.filter(obj => {
        return obj.ID.toString() === id;
    });

    // If no post matches the id, return a fallback object instead of crashing the page.
    if (objReturned.length === 0) {
        return {
            // Keep the requested route id in the response.
            id: id,
            // Set a placeholder title for missing posts.
            title: 'Not Found',
            // Set a placeholder date for missing posts.
            date: 'Not Found',
            // Set a placeholder HTML value for missing posts.
            contentsHTML: 'Not Found'
        };
    } else {
        // If a match exists, return the original object from the JSON file.
        return objReturned[0];
    }
}
