# http://blog.nitrous.io/2013/08/30/using-jekyll-plugins-on-github-pages.html

require 'rubygems'
require 'rake'
require 'rdoc'
require 'date'
require 'yaml'
require 'tmpdir'
require 'jekyll'

desc "Generate blog files"
task :generate do
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => ".",
    "destination" => "_site"
  })).process
end


desc "Generate and publish blog to gh-pages"
task :publish => [:generate] do
  if `git status -s`.empty?
    system "git checkout -b gh-pages" unless system "git checkout gh-pages"
    Dir.mktmpdir do |tmp|
      system "mv _site/* #{tmp}"
      system "rm -rf *"
      system "mv #{tmp}/* ."
    end
    message = "Site updated at #{Time.now.utc}"
    system "git add --all"
    system "git commit -am #{message.shellescape}"
    system "git push origin gh-pages"
    system "git checkout master"
    system "echo publish successful"
  else
    system "echo publish aborted due to dirty repo"
  end
end
