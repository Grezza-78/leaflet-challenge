# leaflet-challenge


This challenge is aimed at providing the United States Geological Survey (USGS) with a data visualisation tool to help analyse Earthquake data. 

The purpose of the tool is to help present the massive amount data collected from all over the world in a meaningful way as to help educate relevant stakeholders and secure more funding.

The tool is designed to do the following:

* Access the USGS GeoJSON Feed API which is updated every 5 minutes - the data selected in this instance is All Earthquake data from the last 7 days.

* Import the data and plot all the earthquakes based on based on their longitude and latitude.

* For each Earthquake circle marker that is plotted it displays the following:
    * Magnitude - the size of the circle increases with the magnitude size i.e., the bigger the circle the bigger the earthquake
    * Depth - the colour changes with depth of the earthquake i.e., the deeper the earthquake the darker circle colour. The colour coding is outlined in the legend at the bottom right of the tool display
    * Popup - each marker has a popup that outlines the Magnitude, Depth and Time it occurred relative to local time

* The tool also includes several information/display layers for the user to toggle including:
    * Street (part 1)
    * Topographic (part 2)
    * Earthquakes displayed (part 1)
    * Tectonic plates displayed (part 2)



