/**
 * Created by Gebruiker on 24/01/2017.
 */
/**
 * Created by Gebruiker on 24/01/2017.
 */
$.ajax({
    type: 'GET',
    url:'http://localhost:3000/api/competences',
    contentType: 'application/json',
    success:function (data) {
        console.log(data);
        // attributes of competence
        var competenceName;
        var competenceID;
        // attributes of level per competence
        var levelName;
        var levelID;
        //   attributes of learning objective per level
        var learningObjectiveName;
        var learningObjectiveID;
        var learningObjectiveDescription;
        //attributes of child per learning objective
        var childName;
        var childID;
        var childDescription;

        // the html appended containing change
        var html = "";

        // Competence
        $.each(data,function(i){
            competenceName=data[i].name;
            alert(data[i].name);
            competenceID=competence+[i];

            var id = (competenceID);

            html += '<li> <p id="'+id+'">' + competenceName + '</p>';
            html += ' <span id="'+id+'" class="deleteButton pull-right">  Delete </span>';

            html += '<span id="'+id+'" class="pull-right modalButton"> Add Level </span>';


            var hasUL = false;
            if(data[i].levels.length > 0){
                hasUL = true;
                html += '<ul>'
            }

            // LEVEL
            $.each(data[i].levels,function(e){
                levelName=data[i].levels[e].levelName;
                levelID=data[i].levels[e].LevelName+" "+data[i].levels[e].level;

                var id = (levelID).replace(/\./g,'');

                html += '<li> <p id="'+id+'">' + levelName + '</p>';
                html += ' <span id="'+id+'" class="deleteButton pull-right"> <!--<i class="glyphicon glyphicon-remove-circle"></i>--> Delete </span>';
                html += '<span id="'+id+'" class="pull-right modalButton"> <!--<i class="glyphicon glyphicon-plus"></i>--> Add learning objective </span>';


                var hasUL = false;
                if(data[i].levels[e].learningObjectives.length > 0){
                    hasUL = true;
                    html += '<ul>'
                }



                // LO 1
                $.each(competence[i].level[e].learningObjectives,function(a){
                    learningObjectiveName =data[i].levels[e].learningObjectives[a].learningObjectiveId;
                    learningObjectiveID=data[i].levels[e].learningObjectives[a].learningObjectiveId;

                    var id = (learningObjectiveID).replace(/\./g,'');

                    html += '<li> <p id="'+id+'">' + learningObjectiveName + '</p>';
                    html += ' <span id="'+id+'" class="deleteButton pull-right"> <!--<i class="glyphicon glyphicon-remove-circle"></i>--> Delete </span>';
                    html += '<span id="'+id+'" class="pull-right modalButton"> <!--<i class="glyphicon glyphicon-plus"></i>--> Add Child </span>';



                    html += '</li>';
                });



                if(hasUL) {
                    html += '</ul>';
                }

                html += '</li>';

            });


            if(hasUL) {
                html += '</ul>';
            }

            html += '</li>';


        }) ;

        $('#tree3').append(html);


        $.fn.extend({
            treed: function (o) {

                var openedClass = 'glyphicon-minus-sign';
                var closedClass = 'glyphicon-plus-sign';

                if (typeof o != 'undefined'){
                    if (typeof o.openedClass != 'undefined'){
                        openedClass = o.openedClass;
                    }
                    if (typeof o.closedClass != 'undefined'){
                        closedClass = o.closedClass;
                    }
                }

                //initialize each of the top levels
                var tree = $(this);
                tree.addClass("tree");
                tree.find('li').has("ul").each(function () {
                    var branch = $(this); //li with children ul
                    branch.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
                    branch.addClass('branch');
                    branch.on('click', function (e) {
                        if (this == e.target) {
                            var icon = $(this).children('i:first');
                            icon.toggleClass(openedClass + " " + closedClass);
                            $(this).children().children().toggle();
                        }
                    });
                    branch.children().children().toggle();
                });
                //fire event from the dynamically added icon
                tree.find('.branch .indicator').each(function(){
                    $(this).on('click', function () {
                        $(this).closest('li').click();
                    });
                });
                //fire event to open branch if the li contains an anchor instead of text
                tree.find('.branch>a').each(function () {
                    $(this).on('click', function (e) {
                        $(this).closest('li').click();
                        e.preventDefault();
                    });
                });
                //fire event to open branch if the li contains a button instead of text
                tree.find('.branch>button').each(function () {
                    $(this).on('click', function (e) {
                        $(this).closest('li').click();
                        e.preventDefault();
                    });
                });
            }
        });

//Initialization of treeviews
        $('#tree1').treed();
        $('#tree2').treed({openedClass:'glyphicon-folder-open', closedClass:'glyphicon-folder-close'});
        $('#tree3').treed({openedClass:'glyphicon-chevron-down', closedClass:'glyphicon-chevron-right'});



        $('.modalButton').on('click',function () {

            $('#add-learningObjective').modal('show');

            $('#add-learningObjective-contributesToLearningObjective').val($(this).attr('id'));

        });



        $('#tree3 .modalButton').on('mouseover',function () {


            var temp = $(this).attr('id');
            console.log(temp);

            $('#'+temp).css('color','#7F0');
        });

        $('#tree3 .modalButton').on('mouseout',function () {

            var temp = $(this).attr('id');

            $('#'+temp).css('color','#369');
        });




        $('#tree3 .deleteButton').on('mouseover',function () {


            var temp = $(this).attr('id');

            $('#'+temp).css('color','red');
        });

        $('#tree3 .deleteButton').on('mouseout',function () {

            var temp = $(this).attr('id');

            $('#'+temp).css('color','#369');
        });


        $('li').on('mouseover', function () {

            console.log("over");
        });






    }

});
