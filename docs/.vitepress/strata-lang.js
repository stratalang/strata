export const strataLanguage = {
  id: 'strata',
  scopeName: 'source.strata',
  displayName: 'Strata',
  aliases: ['strata', 'str'],
  patterns: [
    {
      match: '\\b(fn|let|class|interface|trait|import|return|if|else|elseif|while|for|in|try|catch|throw|match|default|public|private|protected|with|impl|Option|Result|Ok|Err|Some|None|Never|Void|Int|Float|String|Bool|Array|True|False|Null|panic|this|main)\\b',
      name: 'keyword.control.strata'
    },
    {
      match: '\\b(Int|Float|String|Bool|Void|Never|Array|Option|Result)\\b',
      name: 'support.type.strata'
    },
    {
      match: ':\\s*\\w+',
      name: 'entity.name.type.strata'
    },
    {
      match: '\\$\\{[^}]+\\}',
      name: 'string.interpolated.strata'
    },
    {
      match: '//.*$',
      name: 'comment.line.strata'
    },
    {
      begin: '/\\*',
      end: '\\*/',
      name: 'comment.block.strata'
    },
    {
      begin: '"',
      end: '"',
      name: 'string.quoted.double.strata',
      patterns: [
        {
          match: '\\$\\{[^}]+\\}',
          name: 'string.interpolated.strata'
        }
      ]
    },
    {
      begin: "'",
      end: "'",
      name: 'string.quoted.single.strata'
    },
    {
      match: '\\b\\d+\\.?\\d*\\b',
      name: 'constant.numeric.strata'
    },
    {
      match: '\\bfn\\s+\\w+',
      name: 'entity.name.function.strata'
    },
    {
      match: '\\bclass\\s+\\w+',
      name: 'entity.name.class.strata'
    }
  ]
}
