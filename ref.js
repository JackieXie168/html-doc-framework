/* Copyright 2014 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

(function() {
    Polymer('cxx-ref', {
        to: "",
        insynopsis: false,

        observe: {
            'in_elem.index': 'indexChanged'
        },
        applyAuthorStyles: true,

        inChanged: function() {
            this.in_elem = document.getElementById(this.in);
            if (this.in &&
                !(this.in_elem &&
                  this.in_elem.tagName.toUpperCase() == 'CXX-FOREIGN-INDEX')) {
                console.error('<cxx-ref>.in (', this.in,
                              ') must be a <cxx-foreign-index>; was',
                              this.in_elem);
            }
        },
        toChanged: function() {
            if (!this.in) {
                this.to_elem = document.getElementById(this.to);
                if (!this.to_elem) {
                    console.error("Broken link", this.to, "from", this);
                    return;
                }
                this.async(function() {
                    // Async makes sure the to_elem is upgraded.
                    if (!(this.to_elem instanceof CxxSectionElement ||
                          this.to_elem instanceof CxxTableElement ||
                          this.to_elem instanceof CxxFigureElement)) {
                        console.error("Reference from", this,
                                      "refers to non-section, non-table, non-figure element",
                                      this.to_elem);
                    }
                });
            }
        },

        indexChanged: function() {
            if (!(this.to in this.in_elem.index)) {
                console.error(this.to, 'not found in', this.in_elem);
            }
        }
    });
})()

