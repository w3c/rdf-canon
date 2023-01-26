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


<h2>Instructions for submitting implementation reports</h2>

<p>Reports should be submitted in Turtle format to
  <a href="mailto:public-rch-wg@w3.org">Public RCH WG</a> or via a Pull
  Request to the <a href="https://github.com/w3c/rdf-canon/pulls">w3c/rdf-canon</a>.</p>

<p>Tests should be run using the test manifests defined in the
  <a href="#test-manifests">Test Manifests</a> Section.</p>

<p>Include an <code>earl:Assertion</code> for each test, referencing the test
  resource from the associated manifest and the test subject being
  reported upon. See the example below:</p>

<pre><code>  [ a earl:Assertion;&#x000A;    earl:assertedBy &lt;--your-developer-identifier--&gt;;&#x000A;    earl:subject &lt;--your-software-identifier--&gt;;&#x000A;    earl:test &lt;--uri-of-test-from-manifest&gt;;&#x000A;    earl:result [&#x000A;      a earl:TestResult;&#x000A;      earl:outcome earl:passed;&#x000A;      dc:date &quot;2023-01-25T10:18:04-08:00&quot;^^xsd:dateTime];&#x000A;    earl:mode earl:automatic ] .&#x000A;</code></pre>

<p>The Test Subject should be defined as a <code>doap:Project</code>, including the name,
  homepage and developer(s) of the software (see <a href="https://github.com/edumbill/doap/wiki">DOAP</a>). Optionally, including the
  project description and programming language. An example test subject description is the following:</p>

<pre><code>  &lt;&gt; foaf:primaryTopic &lt;--your-software-identifier--&gt; ;&#x000A;    dc:issued &quot;2016-12-26T10:18:04-08:00&quot;^^xsd:dateTime ;&#x000A;    foaf:maker &lt;--your-developer-identifier--&gt; .&#x000A;&#x000A;  &lt;--your-software-identifier--&gt; a doap:Project, earl:TestSubject, earl:Software ;&#x000A;    doap:name          &quot;My Cool RDF Canonicalizer&quot; ;&#x000A;    doap:release [&#x000A;      doap:name     &quot;--short name wih version number--&quot;;&#x000A;      doap:revision &quot;--Software version number--&quot; ;&#x000A;      doap:created  &quot;2020-02-19&quot;^^xsd:date;&#x000A;    ] ;&#x000A;    doap:developer     &lt;--your-developer-identifier--&gt; ;&#x000A;    doap:homepage      &lt;--your-software-homepace--&gt; ;&#x000A;    doap:description   &quot;--your-project-description--&quot;@en ;&#x000A;    doap:programming-language &quot;--your-implementation-language--&quot; .&#x000A;</code></pre>

<p>The software developer, either an organization or one or more individuals SHOULD be
  referenced from <code>doap:developer</code> using <a href="http://xmlns.com/foaf/spec">FOAF</a>. For example:</p>

<pre><code>  &lt;--your-developer-identifier--&gt; a foaf:Person, earl:Assertor;&#x000A;    foaf:name &quot;--My Name--&quot;;&#x000A;    foaf:homepage &lt;--my homepage--&gt; .&#x000A;</code></pre>

## Template files:

* `template.haml` – Used by `earl-report` to generate `index.html`. Iterates over the generated `earl.jsonld` file along with built-in information about the working group.

## Process files:

* `Rakefile` – Builds `manifest.ttl` from the test suite. (could also add tasks to build `earl.jsonld`, `earl.ttl`, and `index.html`)

## Generated files:

* `earl.jsonld` – JSON-LD representation of the consolidated EARL submissions build by earl-report as described above.
* `earl.ttl` – Turtle version of consolidated report, build from `earl.jsonld` by earl-report, as described above.
* `index.html` – The processed implementation report, built by earl-report using `earl.jsonld`, as described above.

## Submission files:

Any files (other than `earl.ttl`) ending in `.ttl` are taken as individual EARL reports of test-suite conformance. For example `ruby-earl.ttl` is the report for [Ruby RDF::Normalize](https://github.com/ruby-rdf/rdf-normalize).
