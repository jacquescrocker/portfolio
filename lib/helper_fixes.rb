module WebbyHelpers
  def link_to(title, path = "", options = {})
    super title, path, :attrs => options
  end
  
  def image_tag(path, options = {})
    "<img src=\"#{path}\" #{tag_options(options)} />"
  end
  
  def lorem(*args)
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  end
  
  def hidden
    {:style => "display:none"}
  end
  
  def clear
    "<div class='clear'></div>"
  end
  
  def cycle(*values)
    @index ||= 0
    @index += 1
    
    values[(@index+1) % values.length]
  end
  
  def first(first, rest, options = {})
    @__first_index ||= {}
    key = options[:name] || "default"
    @__first_index[key] ||= 0
    @__first_index[key] += 1
    
    if @__first_index[key] == 1
      first
    else
      rest
    end
  end
  
  def partial(path, options = {})
    render :partial => path, :locals => options
  end

end

Webby::Helpers.register(WebbyHelpers)