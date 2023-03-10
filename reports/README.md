This is a collection of individual
[EARL reports](https://www.w3.org/TR/EARL10-Schema/) for
test subjects claiming JSON-LD processor conformance.

The consolidated report is saved to `index.html` generated
using the
[`earl-report` Ruby gem](https://rubygems.org/gems/earl-report) via the Rakefile.

The [earl.ttl](earl.ttl), [earl.jsonld](earl.jsonld), [manifest.nt](manifest.nt), and [index.html](index.html) files are built automatically via a GitHub Action when files change in this directory, and should not be edited directly.

Run it as follows:

```sh
$ rake
```

## Instructions for submitting implementation reports

Reports should be submitted in Turtle format to
  <a href="mailto:public-rch-wg@w3.org">Public RCH WG</a> or via a Pull
  Request to the [w3c/rdf-canon repository](https://github.com/w3c/rdf-canon/pulls).

Tests should be run using the test manifests defined in the
  [Test Manifests](#test-manifests) Section.

Include an `earl:Assertion` for each test, referencing the test
  resource from the associated manifest and the test subject being
  reported upon. See the example below:

```turtle
[ a               earl:Assertion ;
  earl:assertedBy <--your-developer-identifier--> ;
  earl:subject    <--your-software-identifier--> ;
  earl:test       <--uri-of-test-from-manifest> ;
  earl:result     [ a            earl:TestResult ;
                    earl:outcome earl:passed ;
                    dc:date      "2023-01-25T10:18:04-08:00"^^xsd:dateTime 
                  ] ;
    earl:mode     earl:automatic 
] .
```

The Test Subject should be defined as a `doap:Project`, including the name,
  homepage, and developer(s) of the software
  (see [DOAP](https://github.com/edumbill/doap/wiki)),
  and optionally including the
  project description and programming language. An example test subject description is the following:

```turtle
<> foaf:primaryTopic        <--your-software-identifier--> ;
   dc:issued                "2016-12-26T10:18:04-08:00"^^xsd:dateTime ;
   foaf:maker               <--your-developer-identifier--> .

<--your-software-identifier--> 
   a                        doap:Project , 
                            earl:TestSubject , 
                            earl:Software ;
  doap:name                 "My Cool RDF Canonicalizer" ;
  doap:release              [ doap:name     "--short name wih version number--" ;
                              doap:revision "--Software version number--" ;
                              doap:created  "2020-02-19"^^xsd:date ;
                            ] ;
  doap:developer            <--your-developer-identifier--> ;
  doap:homepage             <--your-software-homepace--> ;
  doap:description          "--your-project-description--"@en ;
  doap:programming-language "--your-implementation-language--" .
```

The software developer, either an organization or one or more individuals SHOULD be
  referenced from <code>doap:developer</code> using <a href="http://xmlns.com/foaf/spec">FOAF</a>. For example:</p>

```turtle
<--your-developer-identifier--> 
   a             foaf:Person , 
                 earl:Assertor ;
   foaf:name     "--My Name--" ;
   foaf:homepage <--my homepage--> .
```

## Template files:

* `template.haml` – Used by `earl-report` to generate `index.html`. Iterates over the generated `earl.jsonld` file along with built-in information about the working group.

## Process files:

* `Rakefile` – Builds `manifest.ttl` from the test suite. (Tasks could also be added to build `earl.jsonld`, `earl.ttl`, and/or `index.html`)

Running the `rake` task and `earl-report` requires installation of Ruby, and the following gems:

* `rdf-turtle`
* `json-ld`
* `haml`
* `kramdown`

## Generated files:

* `earl.jsonld` – JSON-LD representation of the consolidated EARL submissions build by earl-report as described above.
* `earl.ttl` – Turtle version of consolidated report, build from `earl.jsonld` by earl-report, as described above.
* `index.html` – The processed implementation report, built by earl-report using `earl.jsonld`, as described above.
* `manifest.nt` – Local cache of the test-suite manifest files, updated via `rake manifest.nt`.

## Submission files:

Any files ending in `.ttl` (other than `earl.ttl`) are taken as individual EARL reports of `test-suite` conformance. For example, `ruby-earl.ttl` is the report for [Ruby `RDF::Normalize`](https://github.com/ruby-rdf/rdf-normalize).

As described above, each submission should have DOAP, FOAF, and individual Assertion elements.