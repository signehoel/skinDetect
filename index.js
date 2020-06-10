let net = null;

 function showFiles() {
    // An empty img element
    let demoImage = document.getElementById('idImage');
    // read the file from the user
    let file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        demoImage.src = reader.result;
    }
    reader.readAsDataURL(file);
    app();
}  

//loads google charts
google.charts.load('current', {packages: ['corechart', 'bar']});

//This function is to draw a chart of the data. Not yet implemented successfully
function drawStacked(result) {
    var data_ = Array((result.length + 1));
    data_[0] = ['clase','Probabilidad', { role: "style" }];
    data_[1] = [result[0].className, result[0].probability, '#982107'];
    for (iter = 1; iter < result.length; iter++){
        data_[(iter + 1)] = [result[iter].className, result[iter].probability, '#6F76C2'];
    }
    var data = google.visualization.arrayToDataTable(data_);
    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                     { calc: "stringify",
                       sourceColumn: 1,
                       type: "string",
                       role: "annotation" },
                     2]);
    var options = {
        width: 600,
        height: 200,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(view, options);
  }

//outputs to console 
async function app(){
    console.log('loading mobilenet...');
    net = await tf.automl.loadImageClassification('./model.json');
    console.log('Sucessfully loaded model');
    await predice();
}

//classifies image as malignant or benign based on tensorflow model
async function predice(){
    img = document.getElementById('idImage'); //grabbing image uploaded by user
    if (img.src != ""){
        const result = await net.classify(img); //classifying the image
        //drawStacked(result);
        console.log(result);
        var malignantNum = Math.round(result['0']['prob']*100); //making the result a percentage
        var finalResults = document.getElementById("results");
        finalResults.innerHTML = "<h4>Results</h4>";
        var text = document.getElementById("predictions-malignant")
        
        //printing out the results to the page (depending on percentage)
        if (malignantNum > 50){
            text.innerHTML = "This skin lesion has a "+ malignantNum +"% chance of being malignant. We recommend going to see a specialist.";
        }
        else {
            text.innerHTML = "This skin lesion has a "+ malignantNum +"% chance of being malignant. It is unlikely that there is a need for concern.";
        }
    }
}

app();
