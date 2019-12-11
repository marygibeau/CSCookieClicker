import React from 'react';

class Autocomplete extends React.Component {
    render() {
        return (
        <div class="profSearch">
        <h2>Search for `more professors to get cookies!</h2>

        <form autocomplete="off" action="/action_page.php">
            <div class="autocomplete" style="width:300px;">
                <input id="myInput" type="text" name="profWidget" placeholder="Professor Name"/>
            </div>
            <input type="submit"/>
        </form>

        <script>
            autocomplete(document.getElementById("myInput"), professors);
        </script>
        </div>
        );
    }
}