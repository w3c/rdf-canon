This is a collection of individual
[EARL reports](https://www.w3.org/TR/EARL10-Schema/) for
test subjects claiming JSON-LD processor conformance.

The consolidated report is saved to `index.html` generated
using the
[`earl-report` Ruby gem](https://rubygems.org/gems/earl-report).
Run it as follows:

```sh
$ gem install earl-report
$ rm -f manifests.nt && rake manifests.nt
$ earl-report --format json -o earl.jsonld *.ttl
$ earl-report --json --format ttl -o earl.ttl earl.jsonld
$ earl-report --json --format html --template template.haml -o index.html earl.jsonld
```


## Instructions for submitting implementation reports

Reports should be submitted in Turtle format to
  <a href="mailto:public-rch-wg@w3.org">Public RCH WG</a> or via a Pull
  Request to the <a href="https://github.com/w3c/rdf-canon/pulls">w3c/rdf-canon</a>.

Tests should be run using the test manifests defined in the
  <a href="#test-manifests">Test Manifests</a> Section.

Include an <code>earl:Assertion</code> for each test, referencing the test
  resource from the associated manifest and the test subject being
  reported upon. See the example below:

```
[ a earl:Assertion;
    earl:assertedBy &lt;--your-developer-identifier--&gt;
    earl:subject <--your-software-identifier-->;
    earl:test <--uri-of-test-from-manifest>;
    earl:result [
      a earl:TestResult;
        earl:outcome earl:passed;
        dc:date "2023-01-25T10:18:04-08:00"^^xsd:dateTime];
    earl:mode earl:automatic ] .
```

The Test Subject should be defined as a <code>doap:Project</code>, including the name,
  homepage and developer(s) of the software
  (see <a href="https://github.com/edumbill/doap/wiki">DOAP</a>).
  Optionally, including the
  project description and programming language. An example test subject description is the following:

```
<> foaf:primaryTopic <--your-software-identifier--> ;
  dc:issued "2016-12-26T10:18:04-08:00"^^xsd:dateTime ;
  foaf:maker <--your-developer-identifier--> .

<--your-software-identifier--> a doap:Project, earl:TestSubject, earl:Software ;
  doap:name          "My Cool RDF Canonicalizer" ;
  doap:release [
    doap:name     "--short name wih version number--";
    doap:revision "--Software version number--" ;
    doap:created  "2020-02-19"^^xsd:date;
  ] ;
  doap:developer     <--your-developer-identifier--> ;
  doap:homepage      <--your-software-homepace--> ;
  doap:description   "--your-project-description--"@en ;
  doap:programming-language "--your-implementation-language--" .
```

The software developer, either an organization or one or more individuals SHOULD be
  referenced from <code>doap:developer</code> using <a href="http://xmlns.com/foaf/spec">FOAF</a>. For example:</p>

```
<--your-developer-identifier--> a foaf:Person, earl:Assertor;
  foaf:name "--My Name--";
  foaf:homepage <--my homepage--> .
```

## Template files:

* `template.haml` – Used by `earl-report` to generate `index.html`. Iterates over the generated `earl.jsonld` file along with built-in information about the working group.

## Process files:

* `Rakefile` – Builds `manifest.ttl` from the test suite. (could also add tasks to build `earl.jsonld`, `earl.ttl`, and `index.html`)

Running the rake task and earl-report requires the installation of Ruby, and the following gems:

* 'rdf-turtle'
* 'json-ld'
* 'haml'
* 'kramdown'

## Generated files:

* `earl.jsonld` – JSON-LD representation of the consolidated EARL submissions build by earl-report as described above.
* `earl.ttl` – Turtle version of consolidated report, build from `earl.jsonld` by earl-report, as described above.
* `index.html` – The processed implementation report, built by earl-report using `earl.jsonld`, as described above.
* `manifest.nt` – Local cache of the test-suite manifest files, updated via `rake manifest.nt`.

## Submission files:

Any files (other than `earl.ttl`) ending in `.ttl` are taken as individual EARL reports of test-suite conformance. For example `ruby-earl.ttl` is the report for [Ruby RDF::Normalize](https://github.com/ruby-rdf/rdf-normalize).

As described above, each submission should have DOAP, FOAF, and individual Assertion elements.